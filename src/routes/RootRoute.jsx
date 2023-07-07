import { useRoutes } from 'react-router-dom';
import {Main,NotFound} from "@layouts";
import Component from "@pages/components/ComponentHome";
import {UtilHome,StringUtil,DateUtil,CommonUtil,ValidationUtil} from "@pageutils";
import {SamplePageHome,SamplePageCalendarPicker} from "@samplePages";


const RootRoute = () =>{
	const rootRoute = [
		{
			path: '/',
			element: <Main />,
		},
		{
			path: '/SamplePage/*',
			element: <SamplePageHome />,
		},
		{
			path: '/SamplePageCalendarPicker/*',
			element: <SamplePageCalendarPicker />,
		},
		{
			path: '/Util/*',
			element: <UtilHome />,
		},
		{
			path: '/StringUtil/*',
			element: <StringUtil />,
		},
		{
			path: '/DateUtil/*',
			element: <DateUtil />,
		},
		{
			path: '/ValidationUtil/*',
			element: <ValidationUtil />,
		},
		{
			path: '/Component/*',
			element: <Component />,
		},
		{
			path: '/CommonUtil/*',
			element: <CommonUtil />,
		}
		,
		{
			path: '*',
			element: <NotFound />,
		}
	];
 
	return useRoutes(rootRoute || []);
}
export default RootRoute