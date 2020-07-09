// 搜索
function getSearch(parent,keywordVal,jumpPage){
	var reg = new RegExp(keywordVal, 'gi');
	//	console.log(JSON.stringify(data));
	parent.empty();
	if (keywordVal.length > 0) {
		for (var i = 0; i < data.listorg.length; i++) {
			var mine = data.listorg[i].orgname;

			var $divMine = $('<div>');
			var $titleMine = $('<div>');
			$titleMine.attr('class', 'mine');
			$titleMine.text(mine);
			$divMine.append($titleMine);

			for (var k = 0; k < data.listorg[i].listorg.length; k++) {
				var team = data.listorg[i].listorg[k].orgname;
			//	mineTeam.push(team);
				var $divTeam = $('<div>');
				var $titleTeam = $('<div>');
				$titleTeam.attr('class', 'team');
				$titleTeam.text(team);
				$divTeam.append($titleTeam);

				if (data.listorg[i].listorg[k].listWells !== null) {
					for (var j = 0; j < data.listorg[i].listorg[k].listWells.length; j++) {
						var temp = data.listorg[i].listorg[k].listWells[j].name;
						//
						if (reg.test(temp)) {
							var $ul = $('<ul>');
							$ul.attr('class', 'u');
							var $li = $('<li>');
								$li.text(temp);
								//点击井号跳转新页面传井号值
								$li.click(function(){
									var devName = $(this).text();
									openWellCondition(jumpPage,devName);
								})
								$ul.append($li);
								$divTeam.append($ul);
								$divMine.append($divTeam);
								parent.append($divMine);
						}
					}
				}
			}
		}
	}
}


	function openWellCondition(name,devName) {
			api.openWin({
					name: name,
					url: './'+name+'.html',
					bounces: false,
					delay: 200,
					pageParam:{
						dev:devName
					}
			});
	}
