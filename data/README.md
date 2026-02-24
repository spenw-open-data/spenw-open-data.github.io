# Future Energy Scenario Data

This directory contains:

 - the DFES data
 - geographic files needed for the visualisation
 - configuration files
 
## DFES data

The DFES data is provided with one file for each `scenario`/`parameter`/`geography` combination and can be found within [scenarios](scenarios) in the form `scenarios/SCENARIO/GEOGRAPHY/PARAMETER.csv`.

## Geographic files

The sub-directory [maps/](maps) contains the GeoJSON files necessary for the visualisation.

### Configuration files

#### Scenarios

The `scenarios` are defined in [scenarios.json](scenarios.json) (the path can be set when configuring the FES in `options->files->scenarios`). The format is:

```javascript
{
	"Scenario name": {
		"description": "Some text that appears under the drop down",
		// The primary colour for this scenario
		"color": "#00245D",
		// A colour to use for negative values in a diverging colour scale
		"negativecolor": "#d7191c",
		// A CSS class to apply to anything with the class "scenario"
		"css": "best-view",
		// The parameters available for this scenario
		"data": {
			// A parameter key - this should match the key in the parameter configuration file
			"ev": {
				// Define each of the geographies
				"primary": {
					// A CSV file with the data for this scenario/parameter/geography
					"file": "scenarios/BEST_VIEW/primary/UPTAKE___ELECTRIC_VEHICLES___COUNT.csv",
					// The column name for the area ID
					"key": "Primary"
				},
				"lad": {
					// If the data is provided for another geography we can reference that
					"use": "primary",
					// We need to also provide a lookup that gives the splits from the
					// alternate geography to the required geography
					"mapping": "primaries2lad.json",
					// The column name to use for the area ID
					"key": "LAD"
				}
			},
			...
		}
	}
	...
```

#### Parameters

The `parameters` are defined in [parameters.json](parameters.json) (the path can be set when configuring the FES in `options->files->parameters`). The parameters are provided as an ordered array of the form:

```javascript
[
	{
		// The key to use for this parameter
		"key": "ev",
		// The title to show in the drop down
		"title": "Electric Vehicles (number)",
		// A description shown under the dropdown
		"description": "Number of registered plug in electric vehicles (pure and hybrid)",
		// How to combine multiple areas (if we are using a lookup). Options are "sum", "average", and "max"
		"combine": "sum",
		// The units to display
		"units":"",
		// The number of decimal places to use for display
		"dp": 0
	},
	...
]
```
