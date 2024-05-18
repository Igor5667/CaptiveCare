export const validatePrisoner = (prisoner, setIsValid) => {
    const { name, surname, age, reason, release_date } = prisoner;
    return(
        name?.trim() &&
        surname?.trim() &&
        age && age !== 0 &&
        reason?.trim() &&
        release_date?.trim()
    );
}