import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { FileService } from '../file.service';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto): Stock {
    const stocks = this.fileService.read();
    const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock: Stock = {
      id: newId,
      ...createStockDto
    };
    
    this.fileService.add(newStock);
    return newStock;
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    
    if (title) {
      return stocks.filter(stock => 
        stock.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    
    return stocks;
  }

  findOne(id: number): Stock {
    const stocks = this.fileService.read();
    const stock = stocks.find(stock => stock.id === id);
    
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    
    return stock;
  }

  update(id: number, updateStockDto: UpdateStockDto): Stock {
    const stocks = this.fileService.read();
    const stockIndex = stocks.findIndex(stock => stock.id === id);
    
    if (stockIndex === -1) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    
    const updatedStock = { 
      ...stocks[stockIndex], 
      ...updateStockDto,
      id: id // Сохраняем оригинальный ID
    };
    
    stocks[stockIndex] = updatedStock;
    this.fileService.write(stocks);
    
    return updatedStock;
  }

  remove(id: number): void {
    const stocks = this.fileService.read();
    const filteredStocks = stocks.filter(stock => stock.id !== id);
    
    if (filteredStocks.length === stocks.length) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    
    this.fileService.write(filteredStocks);
  }
}