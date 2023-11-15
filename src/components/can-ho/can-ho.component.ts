import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CanHo } from 'src/models/can-ho';
import { CuDan } from 'src/models/cu-dan';
import { CanHoService } from 'src/services/can-ho.service';

@Component({
  selector: 'app-can-ho',
  templateUrl: './can-ho.component.html',
  styleUrls: ['./can-ho.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CanHoComponent implements OnInit {
  canHoDialog: boolean = false;

  viewCuDanDialog: boolean = false;

  canHos!: CanHo[];

  canHo!: CanHo;

  cuDanByCanHo!: CuDan[];

  selectedCanHos!:CanHo[] | null;

  submitted: boolean = false;

  constructor(
    private canHoService: CanHoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.canHo = {};
    this.submitted = false;
    this.canHoDialog = true;
  }

  deleteSelectedCuDans() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa những can ho này không?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedCanHos?.forEach((elements) => {
          if (elements.id !== undefined)
            this.canHoService.deleteCanHo(elements.id).subscribe();
        });
        this.canHos = this.canHos.filter(
          (val) => !this.selectedCanHos?.includes(val)
        );
        this.selectedCanHos = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Xóa thành công các can ho được chọn',
          life: 3000,
        });
      },
    });
  }

  editCuDan(canHo: CanHo) {
    this.canHo = { ...canHo };
    this.canHoDialog = true;
  }

  deleteCuDan(canHo: CanHo) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa can ho nay không ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (canHo.id !== undefined) {
          this.canHoService.deleteCanHo(canHo.id).subscribe({
            next: (respon) => {
              this.canHos= this.canHos.filter((val) => val.id !== canHo.id);
              this.canHo = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Can ho đã được xóa',
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
    this.canHoDialog = false;
    this.submitted = false;
  }

  saveCanHo() {
    this.submitted = true;

    if(this.canHo.dienTich?.trim()){
      if (this.canHo.id) {
        this.canHoService.updateCanHo(this.canHo.id, this.canHo).subscribe({
          next: (data) => {
            console.log('Nhận dữ liệu:', data);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Can ho Updated',
              life: 3000,
            });
            this.canHoService.getAllCanHo().subscribe({
              next: (data) => {
                this.canHos = data;
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
        this.canHoService.addCanHo(this.canHo).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Can Ho Created',
              life: 3000,
            });
            this.canHoService.getAllCanHo().subscribe({
              next: (data) => {
                this.canHos = data;
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

      this.canHoDialog = false;
      this.canHo = {};
    }
  }

  viewCuDan(idCanHo: number){
    this.viewCuDanDialog = true;
    this.cuDanByCanHo = [];
    this.canHoService.getCuDanByCanHo(idCanHo).subscribe({
      next: (data) => {
        this.cuDanByCanHo = data;
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    })
  }
}
