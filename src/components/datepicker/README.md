## maDateRangePicker config

###### format (String)
	The date format string used for Moment.
	click here to see Moment documentation

###### separator (String)
	The separator string used between date strings

###### language (String)
	pre-defined languages are "en" and "cn", you can define your own
 	language then set this to the name of new language.
	You can also set this to "auto" to make it auto detect browser language.

###### startOfWeek (String)
	"sunday" or "monday"

###### getValue (Function)
	This function is called when get date range string from DOM
	When it is called, the context of this function is set to the datepicker DOM

###### setValue (Function)
	This function is called when set date range string to DOM

startDate (String or false)
	This string defines the earliest date which is allowed for the user, same format as `format`

###### endDate (String or false)
	This string defines the latest date which is allowed for the user, same format as `format`

###### minDays (Number)
	This number defines the minimum days of the selected range
	if this is 0, means do not limit minimum days

###### maxDays (Number)
	This number defines the maximum days of the selected range
	if this is 0, means do not limit maximum days

###### showShortcuts (Boolean)
	hide or show shortcuts area

###### shortcuts (Object)
	define the shortcuts buttons. there are some built in shortcuts, see source code

###### time (Object)
	If enabled adds time selection controls.

###### customShortcuts (Array)
	define custom shortcut buttons. see demo.js

###### inline (Boolean)
	whether to render the date range picker dom in inline mode instead of overlay mode,
	if set to true, please set `container` too

###### container (String, css selector || DOM Object)
	where should the date range picker dom should be renderred to

###### alwaysOpen (Boolean)
	if you use inline mode, you may want the date range picker widget to be renderred when the page loads
	set this to true will also hide the "close" button
	

###### singleDate (Boolean)
	choose a single date instead of a date range. If `singleMonth` option is set to true it will show
	only one month instead of two months.
	

###### batchMode (false / 'week' / 'month')
	 auto batch select mode 
	 false (default), week, month, week-range, month-range

###### beforeShowDay (Function)
	A function that takes a date as a parameter and must return an array with:
	[0]: true/false indicating whether or not this date is selectable
	[1]: a CSS class name to add to the date's cell or "" for the default presentation
	[2]: an optional popup tooltip for this date
	The function is called for each day in the datepicker before it is displayed.

###### stickyMonths (Boolean)
	If true, there will only be one previous and one next button. Clicking them will change
	both the months. This setting will have no effect if singleDate option is set to true

###### singleMonth (Boolean || 'auto') Default value: 'auto'
	If true, it will show only one month instead of two months. You can select date range
	in the one month view. If this is set to 'auto', it will be changed to true if the screen width
	is lower than 480.

###### showDateFilter ( Function(Int time, Int date) )
	This is a callback function when creating each date element in the calendar. First paramter will
	be the timestamp of that day. Second parameter will be the date of that month.

###### customTopBar ( Function || String)
	If you set this parameter, it will use this value in the top bar.

###### extraClass (String)
	Set extra class name to the date range picker dom.

###### customArrowPrevSymbol (String / String HTML)
	Set custom previous symbol, you can use html snippet too.

###### customArrowNextSymbol (String / String HTML)
	Set custom next symbol, you can use html snippet too.

###### showTopbar (Boolean)
	If show the top bar.

###### swapTime (Boolean)
	If true and if time is enabled, on choosing first enddate and than startdate, endtime and starttime will be swapped.
        If this configkey is false, only date will be swapped, time will stay constant.
        If time is disabled, this config key is not used.

###### selectForward (Boolean) Default: false
	If this is true, you can only select second date after the first selected date.

###### selectBackward (Boolean) Default: false
	If this is true, you can only select second date before the first selected date.

###### showWeekNumbers (Boolean) Default: false
	If this is true, it will show week number of the year in the calendar.

###### getWeekNumber (Function( Date object ) )
	the function called to generate the week number. the first parameter will be the first day of a week
