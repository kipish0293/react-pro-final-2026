import { WithProtection } from '../../../features/auth/lib/WithProtection';
import { SignUpForm } from '../../../features/auth/ui/SignUpForm';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
