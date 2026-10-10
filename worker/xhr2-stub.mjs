// The site does no HTTP during SSR; @angular/platform-server only imports xhr2 lazily for HttpClient.
export default class XMLHttpRequestStub {}
