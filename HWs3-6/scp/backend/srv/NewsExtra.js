//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'news', () => [
        {
            nid: 'N001', Header: "Petrushka", Content: "useless information",
            toCategory: [
                {cid: "C001", title: "Horticulture", description: "About_Horticulture", tonews: {nid: 'N001', Header: "Petrushka", Content: "useless information"}}
            ],
            toAuthors: [
                { aid: "A001", name: "Petrov", additional_info: "Some_Author" }
            ]
        }
    ]);

    srv.on('READ', 'Category', () => [
        { cid: "C001", title: "Horticulture", description: "About_Horticulture" }
    ]);

    srv.on('READ', 'Authors', () => [
        { aid: "A001", name: "Petrov", additional_info: "Some_Author", tonews: {nid: 'N001', Header: "Petrushka", Content: "useless information" }}
    ]);

};
