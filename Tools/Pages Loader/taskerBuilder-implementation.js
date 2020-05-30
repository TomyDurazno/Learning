function taskerBuilder()
{
	var func;

	var config = {};

	var counter = 0;
	
	var shouldStop = false;
	
	_defaultConfig = function(){
		return {
			interval : 1250,
			times: 5,
		};
	}

	_run = function()
	{
		if(config.times > counter && !shouldStop)
		{
			setTimeout(function(){
				func();
				_run();
			}, config.interval);
			counter++;
		}			
	}
	
	var obj = 
	{
		run: function(fun, conf)
		{				
			if(!fun)
			{
				throw new Error("Need a function!")
			}	
			
			func = fun;	

			shouldStop = false;
			
			counter = 0;
			
			if(conf)
			{
				Object.assign(config, conf);
			}
			else
			{
				config = _defaultConfig();
			}

			_run();
		},
		stop: function()
		{
			shouldStop = true;
		},
		config: function()
		{
			return config;
		}
	}
	
	return obj;
};

tasker = taskerBuilder();

if(!slice)
	var slice = s => Array.prototype.slice.call(s);

function* yielder(arr){
	yield* arr;
}

var urls = [
'https://github.com/sindresorhus/awesome',
'https://github.com/lydiahallie/javascript-questions',
'https://github.com/trekhleb/javascript-algorithms',
'https://github.com/ryanmcdermott/clean-code-javascript',
'https://github.com/ripienaar/free-for-dev',
'https://github.com/yangshun/tech-interview-handbook',
'https://gist.github.com/rondy/af1dee1d28c02e9a225ae55da2674a6f',
'https://github.com/EbookFoundation/free-programming-books',
'https://github.com/minimaxir/big-list-of-naughty-strings',
'https://github.com/MunGell/awesome-for-beginners'
];

var pos = 0;
var conf = { interval : 50, times: urls.length };

tasker.run(() => { 
	window.open(urls[pos]); 
	pos++;
	
	if((pos + 1) == urls.length)
		window.close();
}, conf);