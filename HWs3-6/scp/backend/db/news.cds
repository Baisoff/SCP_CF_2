type Id : String(4);
using Category from './ExtraInfo';
using Authors from './ExtraInfo';

entity news {
    key nid : Id;
    Header : String(40);
    Content : String(255);
    aid : Id;
    cid : Id;

    toCategory : association to many Category on toCategory.cid = cid;
    toAuthors : association to one Authors on toAuthors.aid = aid;
};
