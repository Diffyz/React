import { NEWS_API_URL, NEWS_API_KEY } from './constants';
import { Mapper } from './mappers';

const fetchNewsData = async (category: string): Promise<any> => {
	let data;
	await fetch(NEWS_API_URL + category + NEWS_API_KEY)
		.then(async (response) => {
			return await response.json();
		})
		.then(async (response) => {
			data = await response.articles.map(Mapper.mapViewData);
		});
	return data;
};

export { fetchNewsData };
