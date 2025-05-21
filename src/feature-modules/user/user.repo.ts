import { UserSchema } from "./user.schema";
import { User } from "./user.types";

const findOne = (user: Partial<User>) => UserSchema.findOne({
    where: { ...user, is_deleted: false }
});

const create = (user: User) => {
    return UserSchema.create(user);
}

const update = (user: Partial<User>) => UserSchema.update(user, { where: { id: user.id, is_deleted: false } })

const deleteUser = (id: string) => UserSchema.update({ is_deleted: true }, { where: { id } })

export default {
    findOne,
    create,
    update,
    deleteUser
}