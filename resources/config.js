// Define a new instance of the FES
var dfes = {};

if(!OI) var OI = {};
if(!OI.ready){
	OI.ready = function(fn){
		// Version 1.1
		if(document.readyState != 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	};
}

OI.ready(function(){

	dfes = new FES({
		"options": {
			"scenario": "Best view",
			"view": "primary_view",
			"key": "2025",
			"parameter": "uptake-ev",
			"scale": "relative",
			"years": {"min":2024, "max":2051},
			"files": {
				"parameters": "data/parameters.json",
				"scenarios": "data/scenarios.json"
			},
			"map": {
				"bounds": [[53.078,-3.683],[55.166,-1.774]],
				"attribution": "Vis: <a href=\"https://open-innovations.org/projects/\">Open Innovations</a>, Data: Electricity North West Ltd"
			}
		},
		"layers": {
			"PRIMARYlayer":{
				"geojson":"data/maps/dfes-primary-polygons.simplified.geojson",
				"key": "pry_number_alias",
				"name": "pry_number_alias"
			},
			"BSPlayer":{
				"geojson":"data/maps/dfes-bsp-polygons.geojson",
				"key": "bsp_number_alias",
				"name": "bsp_number_alias"
			},
			"LADlayer":{
				"geojson": "data/maps/enwl_dfes_local_authority_polygons.simplified.geojson",
				"key": "local_authority",
				"name": "local_authority"
			},
			"COUNTYlayer":{
				"geojson": "data/maps/enwl_dfes_county_polygons.simplified.geojson",
				"key": "county",
				"name": "county"
			},
			"LAKEDISTRICTlayer":{
				"geojson": "data/maps/enwl-lake-district-national-park-polygon.geojson",
				"key": "custom_area",
				"name": "name"
			},
			"NETWORKlayer":{
				"geojson": "data/maps/enwl_control_boundary.geojson",
				"key": "group",
				"name": "group"
			}
		},
		"views":{
			"primary_view":{
				"optgroup": "Network",
				"title":"Primary substations",
				"geography": "primary",
				"layers":[{
					"id": "PRIMARYlayer",
					"heatmap": true,
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			},
			"bsp_view":{
				"optgroup": "Network",
				"title":"Bulk supply points",
				"geography": "bsp",
				"layers":[{
					"id": "BSPlayer",
					"heatmap": true,
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			},
			"lad_view":{
				"optgroup": "Administrative",
				"title":"Local authorities",
				"geography": "lad",
				"layers":[{
					"id": "LADlayer",
					"heatmap": true,
					"boundary":{"strokeWidth":2}
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			},
			"county_view":{
				"optgroup": "Administrative",
				"title":"Counties",
				"geography": "county",
				"layers":[{
					"id": "COUNTYlayer",
					"heatmap": true,
					"boundary":{"strokeWidth":2}
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			},
			"lake_district_view":{
				"optgroup": "Administrative",
				"title":"Lake District",
				"geography": "lake-district",
				"layers":[{
					"id": "LAKEDISTRICTlayer",
					"heatmap": true,
					"boundary":{"strokeWidth":2}
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			},
			"network_view":{
				"optgroup": "Network",
				"title":"Entire network",
				"geography": "network",
				"layers":[{
					"id": "NETWORKlayer",
					"heatmap": true,
					"boundary":{"strokeWidth":2}
				}],
				"popup": {
					"text": function(attr){
						var popup,title,dp,value;
						popup = '<h3>%TITLE%</h3><p>%VALUE%</p><p class="warning padded">We could potentially include a graph here showing a line for %SCENARIO%+%PARAMETER%+%TITLE% over the entire time range.</p>';
						title = (attr.properties[attr.name]||'?');
						dp = (typeof attr.parameter.dp==="number" ? attr.parameter.dp : 2);
						value = '<strong>%PARAMETER% '+this.options.key+':</strong> '+(typeof attr.value==="number" ? (dp==0 ? Math.round(attr.value) : attr.value.toFixed(dp)).toLocaleString()+''+(attr.parameter.units ? '&thinsp;'+attr.parameter.units : '') : '?');
						return popup.replace(/\%VALUE\%/g,value).replace(/\%TITLE\%/g,title).replace(/\%SCENARIO\%/g,attr.scenario.title).replace(/\%PARAMETER\%/g,attr.parameter.title); // Replace values
					}
				}
			}
		},
		"on": {
			"click": function(feature,attr){
				let scenario = this.options.scenario;
				let parameter = this.options.parameter;
				let view = this.options.view;
				let geo = this.views[view].geography;
				console.log(feature,scenario,parameter,geo);
				let lid = this.views[view].layers[attr.layer].id;
				let key = feature.properties[this.layers[lid].key];
				console.log(key,this.options.view,this.scenarios[scenario].data[parameter][geo].values[key]);
			},
			"setScenario": function(){
				if(OI.log) OI.log.add('action=click&content='+this.options.scenario);
			},
			"setParameter": function(){
				if(OI.log) OI.log.add('action=click&content='+this.parameters[this.options.parameter].title);
			},
			"processData": function(data,d,url){
				return data;
			},
			"setScale": function(t){
				var abs = document.querySelectorAll("[data-scale='absolute']");
				var rel = document.querySelectorAll("[data-scale='relative']");
				if(abs.length > 0) abs.forEach(function(e){ e.style.display = (t=="absolute") ? '' : 'none'; });
				if(rel.length > 0) rel.forEach(function(e){ e.style.display = (t=="relative") ? '' : 'none'; });
				return this;
			},
			"buildMap": function(){
				var el,div,div2,_obj;
				el = document.querySelector('.leaflet-top.leaflet-left');
				if(el){
					// Does the place search exist?
					if(!el.querySelector('.placesearch')){

						_obj = this;

						div = document.createElement('div');
						div.classList.add('leaflet-control','leaflet-bar');
						div.innerHTML = '<div class="placesearch leaflet-button"><button class="submit" href="#" title="Search" role="button" aria-label="Search"></button><form class="placeform layersearch pop-left" action="search" method="GET" autocomplete="off"><input class="place" id="search" name="place" value="" placeholder="Search for a named area" aria-label="Search for a named area" type="text" /><div class="searchresults" id="searchresults"></div></div></form></div>';
						el.appendChild(div);

						if("geolocation" in navigator){
							div2 = document.createElement('div');
							div2.classList.add('leaflet-control','leaflet-bar');
							div2.innerHTML = '<div class="geolocate leaflet-button"><button id="geolocate" role="button" title="Centre map on my location" aria-label="Centre map on my location"></button></div>';
							el.appendChild(div2);
							addEv('click',div2,{me:this},function(e){
								var btn = e.currentTarget;
								btn.classList.add('searching');
								navigator.geolocation.getCurrentPosition(function(position){
									let bbox = _obj._bounds;
									let lat = position.coords.latitude;
									let lon = position.coords.longitude;
									// Is it within the bounds
									if(lat >= bbox._southWest.lat && lat <= bbox._northEast.lat && lon >= bbox._southWest.lng && lon <= bbox._northEast.lng){
										e.data.me.map.flyTo({lat: lat, lng: lon},12);
									}else{
										_obj.message('Your location seems to be outside of the licence area ('+lat+','+lon+').',{'id':'error','type':'ERROR'});
									}
									btn.classList.remove('searching');
								},function(error){
									e.data.me.log('ERROR','Sorry, no position available.',`ERROR(${error.code}): ${error.message}`);
								},{
									enableHighAccuracy: true, 
									maximumAge        : 2000, 
									timeout           : 10000
								});
							});
						}

						function toggleActive(state){
							let e = el.querySelector('.placesearch');
							if(typeof state!=="boolean") state = !e.classList.contains('typing');
							if(state){
								e.classList.add('typing');
								e.querySelector('input.place').focus();
							}else{
								e.classList.remove('typing');
							}
						}

						addEv('click',div.querySelector('.submit'),{},function(e){ toggleActive(); });

						// Stop map dragging on the element
						addEv('mousedown',el,{me:this},function(e){ e.data.me.map.dragging.disable(); });
						addEv('mouseup',el,{me:this},function(e){ e.data.me.map.dragging.enable(); });

						// Build typeahead searches for places
						// Define a function for scoring how well a string matches
						function getScore(str1,str2,v1,v2,v3){
							var r = 0;
							str1 = str1.toUpperCase();
							str2 = str2.toUpperCase();
							if(str1.indexOf(str2)==0) r += (v1||3);
							if(str1.indexOf(str2)>0) r += (v2||1);
							if(str1==str2) r += (v3||4);
							return r;
						}
						this.search = TypeAhead.init('#search',{
							'items': [],
							'me': this,
							'render': function(d){
								// Construct the label shown in the drop down list
								return d.name+(d.type ? ' ('+d.type+')':'');
							},
							'rank': function(d,str){
								// Calculate the weight to add to this airport
								var r = 0;
								if(postcodes[postcode] && postcodes[postcode].data){
									me.log(d,d.id,postcodes[postcode].data.attributes.lep1);
									if(d.layer=="PRIMARYlayer"){
										if(d.id == matchedprimary){
											r += 10;
										}
									}else{
										for(var cd in postcodes[postcode].data.attributes){
											if(postcodes[postcode].data.attributes[cd]==d.id){
												r += 1;
											}
										}
									}
								}
								if(d.name) r += getScore(d.name,str);
								if(d.id) r += getScore(d.name,str);
								return r;
							},
							'process': function(d){
								// Format the result
								var l,ly,key,i;
								l = d.layer;
								ly = _obj.layers[l].layer;
								key = _obj.layers[l].key;
								for(i in ly._layers){
									if(ly._layers[i].feature.properties[key]==d.id){

										// Zoom to feature
										_obj.map.fitBounds(ly._layers[i]._bounds,{'padding':[5,5]});

										// Open the popup for this feature
										ly.getLayer(i).openPopup();

										// Change active state
										toggleActive(false);
									}
								}
							}
						});
						var postcode = "";
						var postcodes = {};
						var regex = new RegExp(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/);
						var matchedprimary = "";
						this.search.on('change',{'me':this.search},function(e){
							var v = e.target.value.replace(/ /g,"");
							var m = v.match(regex)||[];
							if(m.length){
								_obj.log('INFO','Looks like a postcode',m[0]);
								postcode = m[0];
								if(!postcodes[m[0]]){
									postcodes[m[0]] = {};
									AJAX('https://findthatpostcode.uk/postcodes/'+m[0]+'.json',{
										'dataType':'json',
										'postcode':m[0],
										'this': e.data.me,
										'success': function(data,attr){
											postcodes[attr.postcode] = data;
											matchedprimary = findPrimary(_obj,data);
											this.update();
										}
									});
								}else{
									if(postcodes[m[0]].data) matchedprimary = findPrimary(_obj,postcodes[m[0]]);
								}
							}else postcode = "";
						});
					}
					function findPrimary(_obj,data){
						var matched,j,l,i,geojson;
						// Loop through layers
						for(j = 0; j < _obj.views[_obj.options.view].layers.length; j++){
							l = _obj.views[_obj.options.view].layers[j].id;
							// If the layer is PRIMARYlayer we see if we can match a polygon
							if(l=="PRIMARYlayer"){
								geojson = L.geoJSON(_obj.layers[l].geojson);
								matched = leafletPip.pointInLayer([data.data.attributes.long,data.data.attributes.lat],geojson);
								if(matched.length==1) return matched[0].feature.properties[_obj.layers[l].name];
							}
						}
						return "";
					}
					if(this.search){
						var l,f,i,j,name,code;
						this.search._added = {};
						this.search.clearItems();
						for(j = 0; j < this.views[this.options.view].layers.length; j++){
							l = this.views[this.options.view].layers[j].id;
							name = this.layers[l].name;
							code = this.layers[l].key;
							if(this.layers[l].geojson && this.layers[l].geojson.features && code && name){
								// If we haven't already processed this layer we do so now
								if(!this.search._added[l]){
									f = this.layers[l].geojson.features;
									for(i = 0; i < f.length; i++) this.search.addItems({'name':f[i].properties[name]||"?",'id':f[i].properties[code]||"",'i':i,'layer':l});
									this.search._added[l] = true;
								}
							}
						}
					}
				}
			}
		}
	});

	// Add download button
	if(document.getElementById('download-csv')){
		addEv('click',document.getElementById('download-csv'),{me:dfes},function(e){
			e.preventDefault();
			e.stopPropagation();
			let csv = "";
			let opt = e.data.me.options;
			let filename = ("ENWL-DFES-2025--{{scenario}}--{{parameter}}--{{view}}.csv").replace(/\{\{([^\}]+)\}\}/g,function(m,p1){ return (opt[p1]||"").replace(/[ ]/g,"_"); });
			let values,r,rs,y,v,l,layerid,p,ky,nm;
			let data = e.data.me.scenarios[e.data.me.options.scenario].data[e.data.me.options.parameter][e.data.me.views[e.data.me.options.view].geography];
			csv += data.raw.header.join(",")+"\n";
			// Find the area column
			let col = data.raw.header.indexOf(data.key);
			// Make rows
			for(r = 0; r < data.raw.rows.length; r++){
				csv += (data.raw.header[col].match(",") ? '"' : '') + data.raw.rows[r][col] + (data.raw.header[col].match(",") ? '"' : '');
				for(c = 0; c < data.raw.rows[r].length; c++){
					if(c!=col && data.raw.header[c]==parseInt(data.raw.header[c])){
						csv += ",";
						csv += (typeof e.data.me.parameters[e.data.me.options.parameter].dp==="number" ? data.raw.rows[r][c].toFixed(e.data.me.parameters[e.data.me.options.parameter].dp) : data.raw.rows[r][c]);
					}
				}
				csv += "\n";
			}
			saveToFile(csv,filename,'text/plain');
		});
	}
	function saveToFile(txt,fileNameToSaveAs,mime){
		// Bail out if there is no Blob function
		if(typeof Blob!=="function") return this;

		var textFileAsBlob = new Blob([txt], {type:(mime||'text/plain')});

		function destroyClickedElement(event){ document.body.removeChild(event.target); }

		var dl = document.createElement("a");
		dl.download = fileNameToSaveAs;
		dl.innerHTML = "Download File";

		if(window.webkitURL != null){
			// Chrome allows the link to be clicked without actually adding it to the DOM.
			dl.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}else{
			// Firefox requires the link to be added to the DOM before it can be clicked.
			dl.href = window.URL.createObjectURL(textFileAsBlob);
			dl.onclick = destroyClickedElement;
			dl.style.display = "none";
			document.body.appendChild(dl);
		}
		dl.click();
	}
	function getGeoJSONPropertiesByKeyValue(geojson,key,value){
		if(!geojson.features || typeof geojson.features!=="object"){
			fes.log('WARNING','Invalid GeoJSON',geojson);
			return {};
		}
		for(var i = 0; i < geojson.features.length; i++){
			if(geojson.features[i].properties[key] == value) return geojson.features[i].properties;
		}
		return {};
	}
	function getGeoJSONPropertyValue(l,value){
		if(!fes.layers[l].key){
			fes.log('WARNING','No key set for layer '+l);
			return "";
		}
		if(fes.layers[l] && fes.layers[l].geojson){
			key = (fes.layers[l].name||fes.layers[l].key);
			for(var i = 0; i < fes.layers[l].geojson.features.length; i++){
				if(fes.layers[l].geojson.features[i].properties[fes.layers[l].key] == value) return fes.layers[l].geojson.features[i].properties[key];
			}
			return "";
		}else return "";
	}

});

function saveDOMImage(el,opt){
	if(!opt) opt = {};
	if(!opt.src) opt.src = "map.png";
	if(!el) console.error('No element to save');
	else{
		if(opt.scale){
			if(!opt.height) opt.height = el.offsetHeight*2;
			if(!opt.width) opt.width = el.offsetWidth*2;
			// Force bigger size for element
			w = el.style.getPropertyValue('width');
			h = el.style.getPropertyValue('height');
			el.style.setProperty('width',(opt.width)+'px');
			el.style.setProperty('height',(opt.height)+'px');
		}
		el.classList.add('capture');
		if(el.innerHTML == ""){
			console.error('Nothing to save');
		}else{
			domtoimage.toPng(el,opt).then(function(dataUrl){
				var link = document.createElement('a');
				link.download = opt.src;
				link.href = dataUrl;
				link.click();
				// Reset element
				if(opt.scale){
					el.style.setProperty('width',w);
					el.style.setProperty('height',h);
				}
				el.classList.remove('capture');
			});
		}
	}
}
