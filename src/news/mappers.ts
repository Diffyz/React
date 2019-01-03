import { NewsData } from './interfaces/NewsData';

export const Mapper = {
	mapViewData: (item: any): NewsData => ({
		title: item.title,
		description: item.description,
		urlToImage: item.urlToImage,
	}),
};
