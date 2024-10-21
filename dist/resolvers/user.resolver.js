"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const generate_1 = require("../helpers/generate");
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const token = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.token;
            if (token) {
                const user = yield user_model_1.default.findOne({
                    token: token,
                    deleted: false,
                });
                if (!user) {
                    return {
                        code: 404,
                        message: "User not found"
                    };
                }
                else {
                    return {
                        code: 200,
                        message: "Get user successfully",
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token,
                    };
                }
            }
            else {
                return {
                    code: 404,
                    message: "User is not authenticated or token is missing",
                };
            }
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (emailExist) {
                return {
                    code: 400,
                    message: "Email already exists"
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                user.token = (0, generate_1.generateRandomString)(30);
                const data = new user_model_1.default(user);
                yield data.save();
                return {
                    code: 200,
                    message: "Register successfully",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token,
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const userExist = yield user_model_1.default.findOne({
                email: email,
                deleted: false,
            });
            if (!userExist) {
                return {
                    code: 400,
                    message: "Email doesn't exist"
                };
            }
            if ((0, md5_1.default)(password) !== userExist.password) {
                return {
                    code: 400,
                    message: "Password is incorrect"
                };
            }
            return {
                code: 200,
                message: "Login successfully",
                id: userExist.id,
                fullName: userExist.fullName,
                email: userExist.email,
                token: userExist.token,
            };
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, user } = args;
            yield user_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, user);
            const record = yield user_model_1.default.findOne({ _id: id });
            return record;
        }),
    },
};
