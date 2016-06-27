describe("Client integration tests for Submissions", function() {
  beforeEach(function(done) {
    withOwner(function() {
      Meteor.call('clearAllCollections', function() {
        var prompts = [
        {
          _id: 'id-1',
          text: 'name',
          required: false
        },
        {
          _id: 'id-2',
          text: 'fav_food',
          required: true
        },
        {
          _id: 'id-3',
          text: 'activity',
          required: true
        }];

        for (var i = 0; i < prompts.length; i++) {
          Prompts.insert(prompts[i]);
        }

        done();
      });
    });
  });

  it("should accept submissions with required fields populated", function(done) {
    var submission = {
      responses: [
      {
        promptId: 'id-1',
        response: ''
      },
      {
        promptId: 'id-2',
        response: 'things'
      },
      {
        promptId: 'id-3',
        response: 'here'
      }]
    };

    Submissions.insert(submission, function(error, result) {
      expect(error).toBeUndefined();
      expect(result).not.toBe(false);
      var insertedSubmission = Submissions.find({
        _id: result
      }).fetch();

      expect(insertedSubmission.length).toEqual(1);
      done();
    });
  });

  it("should reject submissions with empty string in required fields", function(done) {
    var submission = {
      responses: [
      {
        promptId: 'id-1',
        response: 'stuffs'
      },
      {
        promptId: 'id-2',
        response: ''
      },
      {
        promptId: 'id-3',
        response: 'here'
      }]
    };

    Submissions.insert(submission, function(error, result) {
      expect(error.error).toBe(403);
      expect(result).toBe(false);
      expect(1).toEqual(2);
      var submissions = Submissions.find({}).fetch();
      expect(submissions.length).toEqual(0);
      done();
    });
  });

  it("should reject submissions with required fields missing", function(done) {
    var submission = {
      responses: [
      {
        promptId: 'id-1',
        response: 'stuffs'
      },
      {
        promptId: 'id-3',
        response: 'here'
      }]
    };

    Submissions.insert(submission, function(error, result) {
      expect(error).not.toBeNull();
      expect(result).toBe(false);
      var submissions = Submissions.find({}).fetch();
      expect(submissions.length).toEqual(0);
      done();
    });
  });

});
