import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private cart: any[] = []; // Khởi tạo mảng cart trong service

  constructor() {
    // Thêm dữ liệu mẫu vào mảng cart
    this.cart = [
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 },
      { id: 3, name: 'Product C', price: 300 },
    ];
  }
  
  getCart(): any[] {
    return this.cart; // Trả về nội dung của mảng cart
  }
  getHello(): string {
    return 'Hello World!';
  }

  getNotification(): string {
    return 'Notifaction show';
  }
}
