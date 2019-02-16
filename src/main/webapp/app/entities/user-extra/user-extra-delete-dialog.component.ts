import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';

@Component({
    selector: 'jhi-user-extra-delete-dialog',
    templateUrl: './user-extra-delete-dialog.component.html'
})
export class UserExtraDeleteDialogComponent {
    userExtra: IUserExtra;

    constructor(private userExtraService: UserExtraService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userExtraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userExtraListModification',
                content: 'Deleted an userExtra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-extra-delete-popup',
    template: ''
})
export class UserExtraDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userExtra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserExtraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userExtra = userExtra;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
