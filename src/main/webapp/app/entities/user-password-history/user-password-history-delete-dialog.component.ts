import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';
import { UserPasswordHistoryService } from './user-password-history.service';

@Component({
    selector: 'jhi-user-password-history-delete-dialog',
    templateUrl: './user-password-history-delete-dialog.component.html'
})
export class UserPasswordHistoryDeleteDialogComponent {
    userPasswordHistory: IUserPasswordHistory;

    constructor(
        private userPasswordHistoryService: UserPasswordHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userPasswordHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userPasswordHistoryListModification',
                content: 'Deleted an userPasswordHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-password-history-delete-popup',
    template: ''
})
export class UserPasswordHistoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPasswordHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserPasswordHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userPasswordHistory = userPasswordHistory;
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
