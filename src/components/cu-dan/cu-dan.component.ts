import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CanHo } from 'src/models/can-ho';
import { CuDan } from 'src/models/cu-dan';
import { CanHoService } from 'src/services/can-ho.service';
import { CuDanService } from 'src/services/cu-dan.service';

@Component({
  selector: 'app-cu-dan',
  templateUrl: './cu-dan.component.html',
  styleUrls: ['./cu-dan.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CuDanComponent implements OnInit {
  cuDanDialog: boolean = false;

  viewCanHoDialog: boolean = false;

  cuDanCanHoDialog: boolean = false;

  cuDans!: CuDan[];

  cuDan!: CuDan;

  canHos!: CanHo[];

  selectedCanHo!: CanHo;

  canHoByCuDan!: CanHo[];

  selectedCuDans!: CuDan[] | null;

  submitted: boolean = false;

  constructor(
    private cuDanService: CuDanService,
    private canHoService: CanHoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cuDanService.getAllCuDan().subscribe({
      next: (data) => {
        this.cuDans = data;
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });

    this.canHoService.getAllCanHo().subscribe({
      next: (data) => {
        this.canHos = data;
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });
  }

  openNew() {
    this.cuDan = {};
    this.submitted = false;
    this.cuDanDialog = true;
  }

  deleteSelectedCuDans() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa những cư dân này không?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedCuDans?.forEach((elements) => {
          if (elements.id !== undefined)
            this.cuDanService.deleteCuDan(elements.id).subscribe();
        });
        this.cuDans = this.cuDans.filter(
          (val) => !this.selectedCuDans?.includes(val)
        );
        this.selectedCuDans = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Xóa thành công các cư dân được chọn',
          life: 3000,
        });
      },
    });
  }

  editCuDan(cuDan: CuDan) {
    this.cuDan = { ...cuDan };
    this.cuDanDialog = true;
  }

  deleteCuDan(cuDan: CuDan) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa cư dân ' + cuDan.name + ' không ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (cuDan.id !== undefined) {
          this.cuDanService.deleteCuDan(cuDan.id).subscribe({
            next: (respon) => {
              this.cuDans = this.cuDans.filter((val) => val.id !== cuDan.id);
              this.cuDan = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Cư dân đã được xóa',
                life: 3000,
              });
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
    });
  }

  hideDialog() {
    this.cuDanDialog = false;
    this.submitted = false;
    this.cuDanCanHoDialog = false;
    this.selectedCanHo = {};
  }

  saveCuDan() {
    this.submitted = true;

    if (this.cuDan.name?.trim() && this.cuDan.thuongTru?.trim() && this.cuDan.sdt?.trim() && this.cuDan.ngaySinh !== undefined && this.isValidNumberString(this.cuDan.sdt)) {
      if (this.cuDan.id) {
        console.log(this.cuDan);
        this.cuDanService.updateCuDan(this.cuDan.id, this.cuDan).subscribe({
          next: (data) => {
            console.log('Nhận dữ liệu:', data);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cu dan Updated',
              life: 3000,
            });
            this.cuDanService.getAllCuDan().subscribe({
              next: (data) => {
                this.cuDans = data;
              },
              error: (error) => {
                console.error('Error: ', error);
              },
            });
          },
          error: (erro) => {
            console.error('Lỗi:', erro);
          },
          complete: () => {
            console.log('Observable đã hoàn thành.');
          },
        });
      } else {
        console.log(this.cuDan);
        this.cuDanService.addCuDan(this.cuDan).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cu dan Created',
              life: 3000,
            });
            this.cuDanService.getAllCuDan().subscribe({
              next: (data) => {
                this.cuDans = data;
              },
              error: (error) => {
                console.error('Error: ', error);
              },
            });
          },
          error: (response) => {
            console.log(response);
          },
        });
      }

      this.cuDanDialog = false;
      this.cuDan = {};
    }
  }

  viewCanHo(idCuDan: number) {
    this.viewCanHoDialog = true;
    this.canHoByCuDan = [];
    this.cuDanService.getCanHoByCuDan(idCuDan).subscribe({
      next: (data) => {
        this.canHoByCuDan = data;
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });
  }

  addCuDanToCanHo(cuDan: CuDan) {
    this.cuDan = { ...cuDan };
    this.cuDanCanHoDialog = true;
    this.canHoByCuDan = [];
    if (this.cuDan.id !== undefined)
      this.cuDanService.getCanHoByCuDan(this.cuDan.id).subscribe({
        next: (data) => {
          this.canHoByCuDan = data;
          console.log(data);
        },
        error: (error) => {
          console.error('Error: ', error);
        },
      });
  }

  addCuDanForCanHo() {
    this.submitted = true;

    if (this.cuDan.name?.trim()) {
      if (
        this.cuDan.id !== undefined &&
        this.selectedCanHo.id !== undefined &&
        this.checkCanHo(this.cuDan.id)
      ) {
        this.cuDanService
          .addCuDanForCanHo(this.cuDan.id, this.selectedCanHo.id)
          .subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Thêm thành công',
                life: 3000,
              });
            },
            error: (error) => {
              console.error('Error: ', error);
            },
          });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cư dân đã có trong căn hộ!',
          life: 3000,
        });
      }
    }

    this.cuDanCanHoDialog = false;
    this.selectedCanHo = {};
  }

  checkCanHo(id: number): boolean {
    if (this.canHoByCuDan) {
      if (!this.canHoByCuDan.find((res) => res.id === this.selectedCanHo.id)) {
        return true;
      }
    }

    return false;
  }

  isValidNumberString(str: string): boolean {
    // Kiểm tra độ dài của chuỗi
    if (str.length !== 10) {
      return false;
    }

    // Sử dụng biểu thức chính quy để kiểm tra xem chuỗi chỉ chứa các ký tự từ 0 đến 9
    const regex = /^[0-9]+$/;
    return regex.test(str);
  }
}
