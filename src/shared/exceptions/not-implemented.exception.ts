import { HttpException, HttpStatus } from '@nestjs/common';

export class NotImplementedException extends HttpException {
    messages;

    constructor(response) {
        super(response, HttpStatus.NOT_IMPLEMENTED);
        this.messages = response;
    }
}
