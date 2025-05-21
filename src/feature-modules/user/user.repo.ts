import { UserSchema } from "./user.schema";
import { User } from "./user.types";

const findOne = (user: Partial<User>) => UserSchema.findOne({
    where: { ...user, isDeleted: false }
});

const create = (user: User) => {
    return UserSchema.create(user);
}

const update = (user: Partial<User>) => UserSchema.update(user, { where: { id: user.id, isDeleted: false } })

const deleteUser = (id: string) => UserSchema.update({ isDeleted: true }, { where: { id } })

export default {
    findOne,
    create,
    update,
    deleteUser
}