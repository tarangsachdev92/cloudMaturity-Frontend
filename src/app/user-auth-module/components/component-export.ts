import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { UserAuthLoginContainerComponent } from './user-auth-login-container/user-auth-login-container.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserAuthSignContainerComponent } from './user-auth-sign-up-container/user-auth-sign-up-container.component';
import { UserAuthForgotContainerComponent } from './user-auth-forgot-container/user-auth-forgot-container.component';

export const authComponents = [
    ForgotPasswordComponent,
    LoginComponent,
    UserAuthLoginContainerComponent,
    UserAuthForgotContainerComponent,
    UserAuthSignContainerComponent,
    ResetPasswordComponent,
    SignUpComponent
];