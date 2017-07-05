import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '../api/recipes.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import './recipe.html';

Template.recipe.onCreated(function() {
	this.state = new ReactiveDict();
	this.showIngredients = new ReactiveVar(false);
	this.editRecipe = new ReactiveVar(false);
});

Template.recipe.helpers({
	isOwner() {
		return this.owner === Meteor.userId();
	},
	showIngredients() {
		return Template.instance().showIngredients.get();
	},
	editRecipe() {
		return Template.instance().editRecipe.get();
	}
});

Template.recipe.events({
	'click .toggle-checked'() {
		// Set the checked property to the opposite of its current value
		Meteor.call('recipes.setChecked', this._id, !this.checked);
	},
	'click #delete'() {
		Meteor.call('recipes.remove', this._id);
	},
	'click #edit'(event, instance) {
		var current = instance.editRecipe.get();
		instance.editRecipe.set(!current);
	},
	'submit .edit-recipe'(event, instance) {
		event.preventDefault();

		var name = event.target.name;
		var ingredients = event.target.ingredient;

		var recipeName = name.value;
		var recipeIngredients = [];
		ingredients.forEach(ingredient => {
			recipeIngredients.push(ingredient.value);
		});

		// Update recipe in the collection
		Meteor.call('recipes.update', this._id, {
			name: recipeName,
			ingredients: recipeIngredients
		});
	},
	'click .toggle-private'() {
		Meteor.call('recipes.setPrivate', this._id, !this.private);
	},
	'click #recipe-details'(event, instance) {
		event.preventDefault();
		event.stopPropagation();
		var current = instance.showIngredients.get();
		instance.showIngredients.set(!current);
	}
});
