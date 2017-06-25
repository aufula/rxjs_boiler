import $ from 'jquery';
import Rx from 'rxjs/Rx';

const btn = $('#button');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');


/* from events */
const input = $('#input');
// const stream$ = Rx.Observable.fromEvent(input, 'keyup');

/* from array-object */
const set = [
    {name:'john'},
    {name:'john1'},
    {name:'john2'},
    {name:'john4'},
];
const set1 = new Set(['hello',4,{title:'321'}]);
const set2 = new Map([[1,2],[4,3]]);
// const stream$ = Rx.Observable.from(set);

/* from scratch */
const scratch =  new Rx.Observable(ob=>{
    console.log('create ob');

    ob.next('hello mike');
    ob.error(new Error('some thing wrong'));

    ob.next('hello jean');
    setTimeout(()=>{
        ob.next('hello ender');
        ob.complete();
    },3000)
});
// const stream$ = scratch;

/* from promise */
var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'first');
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 6000, 'second');
});
const pms  = Promise.all([p1,p2]);
// const stream$ = Rx.Observable.fromPromise(p1)

/* interval */
// const stream$ = Rx.Observable.interval(1000).take(5)

/* timer */
// const stream$ = Rx.Observable.timer(5000,2000).take(5)

/* range */
// const stream$ = Rx.Observable.range(25,100)

/* ajax */
function getGithubUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/'+ username,
        dataType: 'jsonp'
    }).promise();
}
// const stream$ = Rx.Observable.fromPromise(getGithubUser('tj'))
// .map(user=>user.data.bio)


/* map */
// const stream$ = Rx.Observable.interval(1000).take(5)
const stream$ = Rx.Observable.from([{name:'josn',age:100},{name:'bob',age:20}])
.pluck('name')
.map(x=>x.toUpperCase() )

/* merge */
stream$.merge(Rx.Observable.range(25,3))

// stream$
.catch(err => Rx.Observable.of(err))
.subscribe(
    value => console.log(value),
    err => console.log(err),
    () => console.info('completed!')
);
