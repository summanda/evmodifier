import express = require('express');

export abstract class AbstractRouteController {
    router = express.Router();
    path!: string;
}