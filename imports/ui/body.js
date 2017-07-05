import { Template } from 'meteor/templating';
import { Recipes } from '../api/recipes.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import './recipe.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('recipes');
});

Template.body.helpers({
	recipes() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			// If hide completed is checked, filter recipes
			return Recipes.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
		}
		// Otherwise, return all of the recipes
		return Recipes.find({}, { sort: { createdAt: -1 } });
	},
	incompleteCount() {
		return Recipes.find({ checked: { $ne: true } }).count();
	}
});

Template.body.events({
	'submit .new-recipe'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		// Get value from form element

		var name = event.target.name;
		var ingredients = event.target.ingredient;

		var recipeName = name.value;
		var recipeIngredients = [];
		ingredients.forEach(ingredient => {
			recipeIngredients.push(ingredient.value);
		});

		// Insert a recipe into the collection
		Meteor.call('recipes.insert', {
			name: recipeName,
			ingredients: recipeIngredients
		});

		// Clear form
		// target.text.value = '';
	},
	'change .hide-completed input'(event, instance) {
		console.log(event.target.checked);
		instance.state.set('hideCompleted', event.target.checked);
	}
});
