! function(t) {
	let style = `
	<style>
	.fate-iconcheck-content {
		width: 110px;
		position: relative;
		height: 38px;
		border-width: 2px;
		border-style: solid;
		border-radius: 10px;
		cursor: pointer;
	}

	.fate-iconcheck-content input {
		display: none;
	}

	.fate-iconcheck-icon {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 50px;
		height: 38px;
		line-height: 38px;
		border-right-width: 2px;
		border-right-style: solid;
		text-align: center;
	}

	.fate-iconcheck-icon i,
	.fate-iconcheck-icon svg {
		color: blue;
	}

	.fate-iconcheck-search {
		display: block !important;
		height: 30px;
		width: 88%;
		margin: 5px 5px 5px 10px;
		border-radius: 5px;
		padding-left: 2%;
	}

	.fate-iconcheck-right {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 50px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		transition: all .2s ease;
	}

	.fate-iconcheck-right-rotate {
		transform: rotate(90deg);
	}

	.fate-iconcheck-list {
		position: absolute;
		left: 0px;
		top: 70px;
		min-width: 250px;
		min-height: 50px;
		border-width: 2px;
		border-style: solid;
		animation-name: iconcheck_list;
		animation-duration: .3s;
		animation-fill-mode: both;
		display: none;
		border-radius: 10px;
	}

	.fate-iconcheck-list-ul {
		list-style: none;
		max-height: 230px;
		min-width: 250px;
		overflow-y: auto;
	}

	.fate-iconcheck-list-ul li {
		max-width: 20px;
		padding: 10px;
		float: left;
		margin-top: 5px;
		cursor: pointer;
		text-align: center;
	}

	@keyframes iconcheck_list {
		0% {
			opacity: .3;
			transform: translate3d(0, -5px, 0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	.fate-iconcheck-list-ul::-webkit-scrollbar {
		width: 8px;
	}

	.fate-iconcheck-list-ul::-webkit-scrollbar-track {
		/* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
		border-radius: 10px;
	}

	.fate-iconcheck-list-ul::-webkit-scrollbar-thumb {
		padding: 10px 0px;
		border-radius: 10px;
		background: #409EFF;
		/* -webkit-box-shadow: inset 0 0 6px RGB(243,243,244); */
	}
	.fate-iconcheck-page{
		display: flex;
		justify-content: space-between;
	}
	.icon-all-lenght{
		    padding: 5px 10px;
			    font-size: 13px;
	}
	.fate-icon-page{
		    padding: 5px 10px;
	}
	.fate-icon-round{
		background: #409EFF;
		    padding: 0px 5px;
		    color: white;
			border-radius: 2px;
	}
	</style>
`;

	$('head').append(style);
	let search = `
		<input class="fate-iconcheck-search" type="text" placeholder="请输入图标名称">
		`;
	let page = `<div class="fate-iconcheck-page">
							<div class="icon-all-lenght">
								<span class="icon-lenght-number">共2001个</span>
							</div>
							<div class="fate-icon-page">
								<span class="icon-page-left"><i class="fa-solid fa-angle-left"></i></span>
								<span class="fate-icon-round"><a>1</a> / <a>401</a></span>
								<span class="icon-page-right"><i class="fa-solid fa-angle-right"></i></span>
							</div>
			</div>`;

	let all = $('.fate-iconcheck-content');
	all.attr("data-search") == "true" ? search : search = '';
	let content_html = `
					<div class="fate-iconcheck-icon"><i class="fas fa-0 fa-fw"></i></div>
					<div class="fate-iconcheck-right"><i class="fa-solid fa-angle-right"></i></div>	
					<div class="fate-iconcheck-list">
						${search}
						<ul class="fate-iconcheck-list-ul">
						</ul>
					</div>
	`;

	all.append(content_html);

	let a = $('.fate-iconcheck-icon');
	let b = $('.fate-iconcheck-right');
	let c = $('.fate-iconcheck-list');
	let h = $('.fate-iconcheck-list-ul');

	all.attr("data-page") == "true" ? (c.append(page), h.css("overflow-y", "hidden")) : false;

	let u = $(".icon-lenght-number");
	let i = $(".fate-icon-round");
	let o = $(".icon-page-left");
	let p = $(".icon-page-right");

	a.click(() => {
		fate_icon_list(b, c)
	})
	b.click(() => {
		fate_icon_list(b, c)
	})

	function fate_icon_list(d, j) {
		if (d.hasClass('fate-iconcheck-right-rotate')) {
			d.removeClass('fate-iconcheck-right-rotate');
			j.hide();
		} else {
			d.addClass('fate-iconcheck-right-rotate');
			j.show();
		}
	}
	var data = 1;

	function GIcondata() {
		$.ajax({
			url: "json/IconData.json",
			type: "GET",
			success: function(res) {
				let d = res.data;
				if(all.attr("data-page") == "true"){
					Iconpage(d, u, i, o, p);
				}else{
					GETload(d);
				}
			},
			error: function(e) {
				alert("请求数据失败！");
			}
		});
	}

	GIcondata();

	function GETload(d) {
		// 图标数据展示
		d.forEach((item, index) => {
			let i = `<li data-name="${item.icon_name}" data-class="${item.icon_class}">
						<i class="${item.icon_class}"></i>
					</li>`;
			h.append(i);
		})
		// 获取input赋值
		h.children().click((e) => {
			let $target = $(e.currentTarget)
			let name = $target.attr("data-class");
			all.children("input").val(name);
			a.html('<i class="' + name + '"></i>')
		})
		let s = $(".fate-iconcheck-search");
		s.keyup(() => {
			let sv = s.val();
			let g = h.children("li");
			if (sv != "") {
				g.hide();
				g.each(function(i, n) {
					if ($(n).attr("data-name").indexOf(sv) != -1) {
						$(n).fadeIn(100);
					}
				})
			} else {
				g.show();
			}
		})
	}

	function Iconpage(dt, u, i, o, p) {
		let d = dt;
		let num = 0;
		let l = d.length;
		let allnum = Math.floor(l / 30);
		u.html('共' + l + '个');
		i.html('<a>1</a> / <a>' + allnum + '</a>');
		o.click(() => {
			if (num == 1) {
				return false
			} else {
				num--;
				h.html("");
				let dv = [].concat(d);
				GETload(dv.splice((num - 1) * 30, 30))
				i.html('<a>' + num + '</a> / <a>' + allnum + '</a>');
			}
			console.log(num)
		})
		p.click(() => {
			if (num == allnum) {
				return false
			} else {
				h.html("");
				let dv = [].concat(d);
				GETload(dv.splice(num * 30, 30))
				i.html('<a>' + (num + 1) + '</a> / <a>' + allnum + '</a>');
				num++;
			}
		})
		p.click();
	}

}()
