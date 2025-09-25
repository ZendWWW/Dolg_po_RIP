import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileAccessor {
  filePath: string;
}

@Injectable()
export class FileService<I> {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  public read<T extends I>(): T {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (error) {
      return [] as unknown as T;
    }
  }

  public add<T>(newData: T): void {
    const data = this.read();
    
    if (Array.isArray(data)) {
      data.push(newData);
    }
    
    this.write(data);
  }

  public write<T extends I>(data: T): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}