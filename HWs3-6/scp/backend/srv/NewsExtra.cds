using news as _news from '../db/news';
using Category as _Category from '../db/ExtraInfo';
using Authors as _Authors from '../db/ExtraInfo';

service odata {

  entity news @(
		title: 'news',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _news;

  entity Category @(
		title: 'Category',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Category;

    entity Authors @(
		title: 'Authors',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Authors;

}
