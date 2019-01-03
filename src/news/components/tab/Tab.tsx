import React from 'react';

import { TabProps } from '../../interfaces/TabProps';

import './tab.css';

export const Tab = (props: TabProps) => {
	const { active, onClick, children } = props;
	return (
		<span className='tab'>
			<button className={active ? 'active' : ''} onClick={onClick}>
				{children}
			</button>
		</span>
	);
};
