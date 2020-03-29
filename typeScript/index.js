var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = 'this is' + firstName + lastName;
    }
    return Student;
}());
var usr = new Student('xu', 'fan');
