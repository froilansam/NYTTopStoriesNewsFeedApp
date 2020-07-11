import { object, string } from 'yup';

const schema = object().shape({
	email_address: string().required(),
	password: string().required(),
});

export default schema;
