import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import appRoutes from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { TenderListComponent } from './tender-list/tender-list.component';
import { BiddingComponent } from './bidding/bidding.component';
import { SourceComponent } from './source/source.component';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { AdminWalletComponent } from './admin-wallet/admin-wallet.component';
import { PaymentComponent } from './payment/payment.component';
import { BidEvaluationComponent } from './bid-evaluation/bid-evaluation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { TenderPaymentComponent } from './tender-payment/tender-payment.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { SubmitWorkComponent } from './submit-work/submit-work.component';
import { WorkReportComponent } from './work-report/work-report.component';
import { WorkPogressComponent } from './work-pogress/work-pogress.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { WorkPaymentComponent } from './work-payment/work-payment.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { FinalReportComponent } from './final-report/final-report.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { AwerdComponent } from './awerd/awerd.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserDashboardComponent,
    CreateTenderComponent,
    TenderListComponent,
    BiddingComponent,
    SourceComponent,
    LocationComponent,
    CategoryComponent,
    AdminWalletComponent,
    PaymentComponent,
    BidEvaluationComponent,
    AdminDashboardComponent,
    UserListComponent,
    TenderPaymentComponent,
    WorkOrderComponent,
    SubmitWorkComponent,
    WorkReportComponent,
    WorkPogressComponent,
    PaymentRequestComponent,
    WorkPaymentComponent,
    UserWalletComponent,
    FinalReportComponent,
    ProfileComponent,
    WalletComponent,
    AwerdComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
      RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
