const isDevelopmentNodeEnv = () => process.env.NODE_ENV === 'development';

const isProductionNodeEnv = () => process.env.NODE_ENV === 'production';

const envUtil00 = {
	isDevelopmentNodeEnv,
	isProductionNodeEnv,
};

export default envUtil00;
