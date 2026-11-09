import { WithProtection } from '../../../features/auth/lib/WithProtection';
import { SignInForm } from '../../../features/auth/ui/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
