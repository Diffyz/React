import React from 'react';

import { NewsData } from '../../interfaces/NewsData';
import { fetchNewsData } from '../../actions';
import { CATEGORIES } from '../../constants';
import { Tab } from '../tab/Tab';
import { NewsProps } from '../../interfaces/NewsProps';

import './news.css';

export class News extends React.Component<NewsProps<NewsData>, any> {
	public constructor(props: NewsProps<NewsData>) {
		super(props);
		this.state = {
			data: props.data,
			activeTab: 0,
		};
	}

	isTabActive(indexTab: number): boolean {
		return indexTab === this.state.activeTab;
	}

	componentDidMount = async (): Promise<void> => {
		this.setDataByCategory(CATEGORIES[this.state.activeTab]);
	};

	setDataByCategory = async (category: string): Promise<void> => {
		this.setState({ data: await fetchNewsData(category) });
	};

	setActiveTab = (index: number): void => {
		this.setState({ activeTab: index });
	};

	async switchTab(index: number): Promise<void> {
		this.setActiveTab(index);
		this.setDataByCategory(CATEGORIES[index]);
	}

	renderTabs(): JSX.Element[] {
		let tabs: JSX.Element[] = [];
		for (let i = 0; i < CATEGORIES.length; ++i) {
			tabs.push(
				<Tab
					key={CATEGORIES[i]}
					active={this.isTabActive(i)}
					onClick={() => this.switchTab(i)}
					children={CATEGORIES[i]}
				/>,
			);
		}
		return tabs;
	}

	createNewsElement(news: NewsData): JSX.Element {
		return (
			<div key={news.urlToImage} className='news'>
				<h4>{news.title}</h4>
				<img src={news.urlToImage} />
				<h4>{news.description}</h4>
			</div>
		);
	}

	renderNews = (): JSX.Element[] | void => {
		if (this.state.data) {
			return this.state.data.map(this.createNewsElement);
		}
	};

	render() {
		return (
			<div>
				{this.renderTabs()}
				{this.renderNews()}
			</div>
		);
	}
}
