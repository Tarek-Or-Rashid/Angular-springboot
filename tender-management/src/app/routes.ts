import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { CreateTenderComponent } from "./create-tender/create-tender.component";
import { TenderListComponent } from "./tender-list/tender-list.component";
import { BiddingComponent } from "./bidding/bidding.component";
import { SourceComponent } from "./source/source.component";
import { LocationComponent } from "./location/location.component";
import { CategoryComponent } from "./category/category.component";
import { AdminWalletComponent } from "./admin-wallet/admin-wallet.component";
import { PaymentComponent } from "./payment/payment.component";
import { BidEvaluationComponent } from "./bid-evaluation/bid-evaluation.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { UserListComponent } from "./user-list/user-list.component";
import { WorkOrderComponent } from "./work-order/work-order.component";
import { WorkPogressComponent } from "./work-pogress/work-pogress.component";
import { WorkReportComponent } from "./work-report/work-report.component";
import { PaymentRequestComponent } from "./payment-request/payment-request.component";
import { TenderPaymentComponent } from "./tender-payment/tender-payment.component";
import { WorkPaymentComponent } from "./work-payment/work-payment.component";
import { UserWalletComponent } from "./user-wallet/user-wallet.component";
import { FinalReportComponent } from "./final-report/final-report.component";
import { ProfileComponent } from "./profile/profile.component";
import { AwerdComponent } from "./awerd/awerd.component";

const appRoutes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'user-dashboard', component: UserDashboardComponent },
{ path: 'create-tender', component: CreateTenderComponent },
{ path: 'tender-list', component: TenderListComponent },
{ path: 'bidding/:tenderId', component: BiddingComponent },
{ path: 'sources', component: SourceComponent },
{ path: 'locations', component: LocationComponent },
{ path: 'categories', component: CategoryComponent },
{ path: 'admin-wallet', component: AdminWalletComponent },
{ path: 'payment', component: PaymentComponent },
{ path: 'bid-evaluation', component: BidEvaluationComponent },
{ path: 'admin-dashboard', component: AdminDashboardComponent },
{ path: 'user-list', component: UserListComponent },
{ path: 'workorder/:bidId', component: WorkOrderComponent },
{ path: 'work-pogress', component: WorkPogressComponent },
{ path: 'work-report', component: WorkReportComponent },
{ path: 'payment-request', component: PaymentRequestComponent },
{ path: 'tender-payment/:tenderId', component: TenderPaymentComponent },
{ path: 'work-payment', component: WorkPaymentComponent },
{ path: 'user-wallet', component: UserWalletComponent },
{ path: 'final-report', component: FinalReportComponent },
{ path: 'profile',component:ProfileComponent },
{ path: 'awerd', component: AwerdComponent }


]
export default appRoutes;