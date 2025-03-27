import { Controller, Post, Body, Get, Render, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get()
  @Render('chat')
  getChatPage() {
    return {};
  }

  @Post('send')
  async sendMessage(@Body('message') message: string) {
    try {
      const response = await this.chatService.sendMessage(message);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('close')
  async closeChat() {
    try {
      await this.chatService.closeChat();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('export')
  async exportChat(@Res() res: Response) {
    try {
      const filepath = await this.chatService.exportChatHistory();

      // Send the file
      res.download(filepath, path.basename(filepath), (err) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Clean up the file after sending
        fs.unlink(filepath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting file:', unlinkErr);
          }
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
} 