export class InvalidRequestError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.message = 'Invalid Request';
        this.status = 400;
    }
};

export class InternalServerError extends Error {
    constructor(e) {
        super(e);
        console.log(e)
        this.message = 'Server Error';
        this.status = 500;
    }
};

export class UnauthorisedRequestError extends Error {
    constructor(e) {
        super(e);
        this.status = 401;
    }
};

export class ForbiddenResourceError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.status = 403;
    }
};

export class DetachPaymentError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.status = 500;
        this.message = "Payment Deletion Error"
    }
}

export class PaymentError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.status = 500;
        this.message = "Payment Error";
    }
}

export class FileUploadError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.status = 500;
        this.message = "File upload error";
    }
}

export class UserExistsError extends Error {
    constructor(e) {
        super(e);
        console.log(e);
        this.status = 401;
        this.message = "User already exists !";
    }
}

