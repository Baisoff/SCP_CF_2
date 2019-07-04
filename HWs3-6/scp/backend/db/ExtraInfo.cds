using news from './news';
using Id from './news';

		entity Category {
		    key cid : Id;
		    title : String(40);
		    description : String(255);
		};

		entity Authors {
		    key aid : Id;
		    name : String(40);
		    additional_info : String(100);

    		tonews : association to many news on tonews.aid = aid;
		};
