import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
	// This code only runs on the server
	// Only publish recipes that are public or belong to the current user
	Meteor.publish('recipes', function recipesPublication() {
		return Recipes.find({
			$or: [{ private: { $ne: true } }, { owner: this.userId }]
		});
	});
}

Meteor.methods({
	'recipes.insert'(recipe) {
		check(recipe.name, String);
		check(recipe.ingredients, Array);

		// Make sure the user is logged in before inserting a task
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Recipes.insert({
			name: recipe.name,
			ingredients: recipe.ingredients,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'recipes.update'(recipeId, recipe) {
		check(recipe.name, String);
		check(recipe.ingredients, Array);

		// Make sure the user is logged in before inserting a task
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Recipes.update(recipeId, { $set: { name: recipe.name, ingredients: recipe.ingredients } });
	},
	'recipes.remove'(recipeId) {
		check(recipeId, String);
		const task = Recipes.findOne(recipeId);
		if (task.private && task.owner !== Meteor.userId()) {
			// If the task is private, make sure only the owner can delete it
			throw new Meteor.Error('not-authorized');
		}
		Recipes.remove(recipeId);
	},
	'recipes.setChecked'(recipeId, setChecked) {
		check(recipeId, String);
		check(setChecked, Boolean);

		const task = Recipes.findOne(recipeId);
		if (task.private && task.owner !== Meteor.userId()) {
			// If the task is private, make sure only the owner can check it off
			throw new Meteor.Error('not-authorized');
		}

		Recipes.update(recipeId, { $set: { checked: setChecked } });
	},
	'recipes.setPrivate'(recipeId, setToPrivate) {
		check(recipeId, String);
		check(setToPrivate, Boolean);

		const task = Recipes.findOne(recipeId);

		// Make sure only the task owner can make a task private
		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Recipes.update(recipeId, { $set: { private: setToPrivate } });
	}
});
