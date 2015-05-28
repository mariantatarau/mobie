angular.module('pagesData', [])
.provider('pagesData', function () {
	var pages = this.pages = [
  {
    "partialPath": "api/mobie/directive/mbSidenav",
    "aliases": [
      "mbSidenav",
      "directive:mbSidenav",
      "mobie.mbSidenav",
      "module:mobie.mbSidenav",
      "mobie.directive:mbSidenav",
      "module:mobie.directive:mbSidenav"
    ],
    "module": "mobie",
    "area": "api",
    "name": "mbSidenav",
    "docType": "directive"
  },
  {
    "partialPath": "api/mobie/object/MbComponent",
    "aliases": [
      "MbComponent",
      "object:MbComponent",
      "mobie.MbComponent",
      "module:mobie.MbComponent",
      "mobie.object:MbComponent",
      "module:mobie.object:MbComponent"
    ],
    "module": "mobie",
    "area": "api",
    "name": "MbComponent",
    "docType": "object"
  },
  {
    "partialPath": "api/mobie/service/$mbComponent",
    "aliases": [
      "$mbComponent",
      "service:$mbComponent",
      "mobie.$mbComponent",
      "module:mobie.$mbComponent",
      "mobie.service:$mbComponent",
      "module:mobie.service:$mbComponent"
    ],
    "module": "mobie",
    "area": "api",
    "name": "$mbComponent",
    "docType": "service"
  },
  {
    "partialPath": ".",
    "docType": "indexPage"
  }
];

	this.resolve = function (page) {
		return path.join(page.area, page.module,	page.docType,	page.name);
	};

	this.$get = function () {
		return pages;
	};
});