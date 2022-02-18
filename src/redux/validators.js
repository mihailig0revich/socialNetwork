export const hasText = (value) => {
    return value ? undefined : "Поле должно быть заполнено";
} 

export const maxLengthCreator = (len) => (value) => {
    if (value) {
        return value.length <= len ? undefined : "Слишком много символов";
    }
};