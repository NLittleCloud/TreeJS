const choice = prompt('Выберите номер задачи 1-5', '');

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min+1) + min);
}

switch(+choice){

    case 1:

        function convertSpeed(speed, type){
            if (type == 'toMS')
            {
                return `convertSpeed(${speed}, '${type}') -> '${speed/3.6}' м/с`;
            } else if (type == 'toKMH'){
                return `convertSpeed(${speed}, '${type}') -> '${speed*3.6}' км/ч`;
            }
        }

        console.log(convertSpeed(36, 'toMS'));
        console.log(convertSpeed(36, 'toKMH'));
        break;
    
    case 2:
        function absValue(x){
            if(x < 0) return -x;
            else return x;
        }
        
        let a = prompt('Введите число', '');

        if(!isNaN(a)){
            console.log(`absValue(${a}) -> ${absValue(a)}`);
        }

        break;

    case 3:

        let student = {
            group: 201,
            last_name: "Иванов",
            first_name: "Иван"
        };

        console.log(`Список свойств: ${Object.keys(student).join(', ')}`);
        console.log(`Студент ${student.first_name} ${student.last_name} учится в  ${student.group} группе`);
        break;

    case 4:

        let min = +prompt('Введите минимальное число', '');
        let max = +prompt('Введите максимальное число', '');

        console.log(`randomNumber(${min},${max}) -> ${randomNumber(min,max)}`);
        break;

    case 5:

        function sampleArray(mass, kol){

            let mass2 = [];

            for(i = 1; i <= kol; i++)
            {
              //  mass2.push(randomNumber(Math.min.apply(null, mass), Math.max.apply(null, mass)));
                mass2.push(mass[randomNumber(0, mass.length-1)]);
            }
            return mass2;
        }

        let mass = ['a', 'b', 'c' , 's', 'as'];
        let kol = 4;

        console.log(`sampleArray(${mass}, ${kol}) -> [${sampleArray(mass, 2)}]`);

        break;

}
