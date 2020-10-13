let leftValue = 0;
let isMoving = false;

function moveRight()
{
	const active = $('.active');
	const next = active.next();
	if (!next.hasClass('polaroid-wrapper'))
	{
		isMoving = false;
		return;
	}
	active.removeClass('active');
	next.addClass('active');

	const width = $(next).width();
	leftValue -= width;
	const margin = parseInt($(next).css('margin-left'));
	leftValue -= margin;
	$.each($('#scroller').children(), (i, v) =>
	{
		$(v).css({'left': leftValue + 'px'});
	});
	isMoving = false;
}

function moveLeft()
{
	const active = $('.active');
	const next = active.prev();
	if (!next.hasClass('polaroid-wrapper'))
	{
		isMoving = false;
		return;
	}
	active.removeClass('active');
	next.addClass('active');

	const width = $(next).width();
	leftValue += width;
	const margin = parseInt($(next).css('margin-left'));
	leftValue += margin;
	$.each($('#scroller').children(), (i, v) =>
	{
		$(v).css({'left': leftValue + 'px'});
	});
	isMoving = false;
}

$('#leftarrow').on('click', () =>
{
	if (!isMoving)
	{
		isMoving = true;
		moveLeft();
	}
});

$('#rightarrow').on('click', () =>
{
	if (!isMoving)
	{
		isMoving = true;
		moveRight();
	}
});

$(window).on('keydown', (e) =>
{
	if (!isMoving)
	{
		isMoving = true;
		switch(e.which)
		{
			case 37:
				moveLeft();
				break;

			case 39:
				moveRight();
				break;

			default: return;
		}
		e.preventDefault();
	}
});

$(window).bind('mousewheel DOMMouseScroll', (e) =>
{
	if (!isMoving)
	{
		isMoving = true;
		//scroll up : scroll down
		(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) ? moveLeft() : moveRight();
	}
});

$(window).on('load', () =>
{
	$('#scroller a').css({'transform': 'scale(.8);'});
});