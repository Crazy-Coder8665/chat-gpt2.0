import { Injectable, OnModuleDestroy } from '@nestjs/common';
import puppeteerExtra from 'puppeteer-extra';
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require('user-agents');
import * as fs from 'fs';
import * as path from 'path';
import { connect } from 'puppeteer-real-browser';
import { Browser, Page } from 'rebrowser-puppeteer-core';

puppeteerExtra.use(StealthPlugin());

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatService implements OnModuleDestroy {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private chatHistory: ChatMessage[] = [];

  constructor() { }

  private async initializeBrowser() {
    if (!this.browser) {
      const { browser, page } = await connect({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920,1080',
        ],
      });
      this.browser = browser;
      this.page = page;

      // Set up page with stealth measures
      await this.page.setViewport({
        width: 1920,
        height: 1080,
      });

      // Set geolocation
      await this.page.setGeolocation({
        latitude: 40.7128,
        longitude: -74.0060,
      });

      const userAgent = new UserAgent({ deviceCategory: 'desktop' });
      await page.setUserAgent(userAgent.toString());
    }
  }

  async sendMessage(message: string) {
    try {
      await this.initializeBrowser();
      if (!this.page) throw new Error('Page not initialized');

      // Navigate to ChatGPT
      const currentUrl = this.page.url();
      if (currentUrl !== 'https://chatgpt.com/') {
        await this.page.goto('https://chatgpt.com/', { waitUntil: 'networkidle0', timeout: 60000 });
      }

      // // Handle login if needed
      // const loginButton = await this.page.$('button:has-text("Log in")');
      // if (loginButton) {
      //   await loginButton.click();
      //   await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
      // }

      // Add user message to history
      this.chatHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // Type the hashtag with human-like delays
      await this.page.type('div[id="prompt-textarea"] p', message, { delay: 50 });

      // Click send button
      const sendButton = await this.page.$('button[aria-label="Send prompt"]');
      if (sendButton) {
        await sendButton.click();
      } else {
        throw new Error('Send button not found');
      }

      // Wait for response
      await this.page.waitForSelector('div[data-message-author-role="assistant"]', { timeout: 30000 });


      await new Promise(resolve => setTimeout(resolve, 20000));
      // Get the response
      const response = await this.page.evaluate(() => {
        const elements = document.querySelectorAll('div[data-message-author-role="assistant"]');
        return elements[elements.length - 1].textContent;
      });

      // Add assistant response to history
      this.chatHistory.push({
        role: 'assistant',
        content: response || '',
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      console.error('Error in chat service:', error);
      throw new Error('Failed to process message');
    }
  }

  async exportChatHistory(): Promise<string> {
    try {
      // Create CSV content
      const csvContent = [
        ['Role', 'Message', 'Timestamp'],
        ...this.chatHistory.map(msg => [
          msg.role,
          `"${msg.content.replace(/"/g, '""')}"`, // Escape quotes in content
          msg.timestamp.toISOString()
        ])
      ].map(row => row.join(',')).join('\n');

      // Create exports directory if it doesn't exist
      const exportsDir = path.join(process.cwd(), 'exports');
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir);
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `chat-history-${timestamp}.csv`;
      const filepath = path.join(exportsDir, filename);

      // Write to file
      fs.writeFileSync(filepath, csvContent);

      return filepath;
    } catch (error) {
      console.error('Error exporting chat history:', error);
      throw new Error('Failed to export chat history');
    }
  }

  async closeChat() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    // Clear chat history when closing
    this.chatHistory = [];
  }

  async onModuleDestroy() {
    await this.closeChat();
  }
} 