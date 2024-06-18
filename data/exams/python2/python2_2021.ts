import Test from "../../interfaces/Test";

const python2_2021: Test = {
  id: "python2-2021",
  subject: "python2",
  title: "Python 2 Test 2021",
  description: "Test your Python 2 knowledge",
  questions: [
    {
      id: "q1",
      question:
        '<h3>By selecting "I confirm", I hereby declare under oath that I will work on this examination on my own without any help or any third-party assistance.</h3><p>By selecting "I confirm", I understand that noncompliance results in invalidation of the assessment, whereby the invalidated examination will be added to the total number of retakes and noncompliance may result in further legal action.</p>',
      options: ["I confirm", "I do not confirm"],
      correctOptions: ["I confirm"],
    },
    {
      id: "q2",
      question:
        "<h3>You want to predict if the current image contains a traffic sign, a car, or a street. For each of the three objects, a prediction should be made. All three objects may occur in the image at the same time. This is a</h3>",
      options: [
        "a. binary classification task",
        "b. multilabel classification task",
        "c. multiclass classification task",
        "d. regression task",
      ],
      correctOptions: ["b. multilabel classification task"],
    },
    {
      id: "q3",
      question:
        "<h3>A model performs well on a small training set. Select the correct statement:</h3>",
      options: [
        "a. The model generalizes well to unseen data.",
        "b. We do not know if the model generalizes well to unseen data.",
        "c. This is not possible.",
        "d. The model does not generalize well to unseen data.",
      ],
      correctOptions: [
        "b. We do not know if the model generalizes well to unseen data.",
      ],
    },
    {
      id: "q4",
      question: "<h3>In ML, github.com is a main resource for...</h3>",
      options: [
        "a. peer-reviewed publications.",
        "b. pre-print publications that do not need to be peer-reviewed.",
        "c. published code, baseline implementations, benchmarks.",
        "d. conference and journal papers (e.g. NeurIPS, ICRL, and ICML).",
      ],
      correctOptions: [
        "c. published code, baseline implementations, benchmarks.",
      ],
    },
    {
      id: "q5",
      question:
        '<h3>What does loss.backward() do if "loss" is a PyTorch tensor?</h3>',
      options: [
        'a. It calculates the gradient of "loss" with respect to the trainable parameters in the computational graph and stores them.',
        'b. It calculates the gradient of "loss" with respect to the trainable parameters in the computational graph and performs an update step on them.',
        'c. It reverses the computational graph associated with "loss".',
        'd. It sets the gradients associated with "loss" to 0.',
      ],
      correctOptions: [
        'a. It calculates the gradient of "loss" with respect to the trainable parameters in the computational graph and stores them.',
      ],
    },
    {
      id: "q6",
      question:
        '<h3>What are "hyperparameters" in the context of machine learning?</h3>',
      options: [
        "a. Parameters controlling model complexity or the training procedure (e.g. network learning rate).",
        "b. Representations of concrete models inside the model class (e.g. network weights).",
        "c. A function that takes model predictions and targets as input and returns a quality measure of the predictions.",
        "d. A class of algorithms (e.g. neural networks, SVMs, ...).",
      ],
      correctOptions: [
        "a. Parameters controlling model complexity or the training procedure (e.g. network learning rate).",
      ],
    },
    {
      id: "q7",
      question: "<h3>torch.utils.data.Subset can be used to:</h3>",
      options: [
        "a. Generate a dataset from a subset of the original dataset according to a list of indices.",
        "b. Derive a custom class that creates minibatches from samples.",
        "c. Derive a class that takes care of sub-processes.",
        "d. Find a good subset of the input features, e.g. for dimensionality reduction.",
      ],
      correctOptions: [
        "a. Generate a dataset from a subset of the original dataset according to a list of indices.",
      ],
    },
    {
      id: "q8",
      question: '<h3>A "hash function"...</h3>',
      options: [
        "a. takes model parameters and targets as input and returns a measure of hardware usage efficiency.",
        "b. maps an input, e.g. a file content, to a fixed-size vector/value.",
        "c. is a special Python function, which maps a model to a different device.",
        "d. takes model predictions and targets as input and returns a quality measure of the predictions.",
      ],
      correctOptions: [
        "b. maps an input, e.g. a file content, to a fixed-size vector/value.",
      ],
    },
    {
      id: "q9",
      question: "<h3>The method .to() in PyTorch can be used to:</h3>",
      options: [
        'a. Assign pre-trained parameters to a new model (via the "pretrained_params" parameter).',
        "b. Apply a neural network to some new input (via model.to(input)).",
        'c. Move the object to a different device (via the "device" parameter).',
        'd. To set the target value for a given data sample during training (via the "target" parameter).',
      ],
      correctOptions: [
        'c. Move the object to a different device (via the "device" parameter).',
      ],
    },
    {
      id: "q10",
      question: "<h3>What is the purpose of tensorboard?</h3>",
      options: [
        "a. To provide access to cloud computing resources for PyTorch projects.",
        "b. Monitoring of training progress via the web browser using visualizations like plots and histograms.",
        "c. To provide a convenient way to evaluate a model's performance on standard benchmark tasks.",
        "d. To provide a forum for technical discussions concerning PyTorch.",
      ],
      correctOptions: [
        "b. Monitoring of training progress via the web browser using visualizations like plots and histograms.",
      ],
    },
    {
      id: "q11",
      question:
        '<h3>Assume that "MyModule" is a class properly derived from the torch.nn.Module class and "tensor_a" is a PyTorch tensor. What does the following code do? MyModule(tensor_a)</h3>',
      options: [
        "a. Creates an instance of MyModule. Then applies the forward() method of my_module with argument tensor_a.",
        "b. Creates an instance of MyModule.",
        "c. Creates an instance of MyModule. Then calls the __getitem__() method of my_module with argument tensor_a.",
        "d. It raises an exception, since one can not create instances of MyModule.",
      ],
      correctOptions: ["b. Creates an instance of MyModule."],
    },
    {
      id: "q12",
      question:
        "<h3>What would be the output of the following code?</h3><pre>import torch\nclass MyModule():\n    def __init__(self, a):\n        super(MyModule, self).__init__()\n        self.a = a\n    def forward(self, x):\n        output = x + self.a\n        return output\nmy_module = MyModule(2.)\nc = my_module(5.)\nprint(c)</pre>",
      options: [
        "a. It raises an exception because the __getitem__() method is missing in MyModule.",
        'b. "7.0"',
        'c. It raises an exception at "self.a = torch.tensor(a, dtype=torch.float32)" because only PyTorch trainable parameters and submodules can be used as attribute.',
        "d. It raises an exception because MyModule should be derived from torch.nn.Module.",
      ],
      correctOptions: [
        "d. It raises an exception because MyModule should be derived from torch.nn.Module.",
      ],
    },
    {
      id: "q13",
      question: "<h3>What does .backward() do in PyTorch?</h3>",
      options: [
        "a. It reverses the previous operation in the computational graph.",
        "b. It trains the network parameters automatically.",
        "c. It computes gradients automatically without accumulating them.",
        "d. It computes gradients automatically and accumulates them.",
      ],
      correctOptions: [
        "d. It computes gradients automatically and accumulates them.",
      ],
    },
    {
      id: "q14",
      question:
        "<h3>You get data that measures the times it took for trees to grow. The measured times can be any real numbers in range [0, 1000]. Which type of data is this?</h3>",
      options: [
        "a. categorical data",
        "b. discrete data",
        "c. continuous data",
        "d. ordinal data",
      ],
      correctOptions: ["c. continuous data"],
    },
    {
      id: "q15",
      question: "<h3>Categorical data can be described as:</h3>",
      options: [
        "a. Quantitative data with mathematical meaning and a natural ordering.",
        "b. Qualitative data without mathematical meaning.",
        "c. A subset of numerical data with continuous values.",
        "d. Qualitative data without mathematical meaning but with a natural ordering.",
      ],
      correctOptions: ["b. Qualitative data without mathematical meaning."],
    },
    {
      id: "q16",
      question: '<h3>What is the "Repository" in the context of Git?</h3>',
      options: [
        'a. Local database that stores the project versions ("commits") and the project history ("tree").',
        'b. Collection of changes ("staged" files) that should be committed.',
        "c. Collection of libraries used in the code files of the project.",
        "d. Local directory that is monitored by Git.",
      ],
      correctOptions: [
        'a. Local database that stores the project versions ("commits") and the project history ("tree").',
      ],
    },
    {
      id: "q17",
      question:
        '<h3>What does the command "commit" in the context of Git do?</h3>',
      options: [
        "a. Commits the model to one device.",
        "b. Commits new/modified files from the index to the Git repository.",
        "c. Commits the model to one datatype.",
        "d. Makes your Git repository final and prevents any further modifications.",
      ],
      correctOptions: [
        "b. Commits new/modified files from the index to the Git repository.",
      ],
    },
    {
      id: "q18",
      question: "<h3>Numerical data includes:</h3>",
      options: [
        "a. categorical and discrete data",
        "b. continuous and discrete data",
        "c. continuous, discrete, ordinal, and categorical data",
        "d. continuous and categorical data",
      ],
      correctOptions: ["b. continuous and discrete data"],
    },
    {
      id: "q19",
      question:
        "<h3>What would be the output of the following code?</h3><pre>import torch\nclass MyModule(torch.nn.Module):\n    def __init__(self, a):\n        super(MyModule, self).__init__()\n        self.a = a\n    def __getitem__(self, x):\n        output = x - self.a\n        return output\nmy_module = MyModule(2.)\nc = my_module(5.)\nprint(c)</pre>",
      options: [
        'a. "3.0"',
        'b. It raises an exception because "super(MyModule, self).__init__()" should not be used with torch.nn.Module.',
        "c. It raises an exception because the forward() method is missing in MyModule.",
        "d. It raises an exception because MyModule should be derived from torch.nn.Module.",
      ],
      correctOptions: [
        "c. It raises an exception because the forward() method is missing in MyModule.",
      ],
    },
    {
      id: "q20",
      question: "<h3>torch.utils.data.Dataset can be used to...</h3>",
      options: [
        "a. Derive a custom class that provides access to data via a standardized interface (e.g. __getitem__()).",
        "b. Derive a custom class that takes care of multiprocessing.",
        "c. To loop over batches of the dataset.",
        "d. Derive a custom class that creates minibatches from samples.",
      ],
      correctOptions: [
        "a. Derive a custom class that provides access to data via a standardized interface (e.g. __getitem__()).",
      ],
    },
    {
      id: "q21",
      question:
        "<h3>Which of the following sources contains only reviewed publications?</h3>",
      options: [
        "a. github.com.",
        "b. scholar.google.com.",
        "c. Conference and journal papers (e.g. NeurIPS, ICRL, and ICML).",
        "d. arxiv.org.",
      ],
      correctOptions: [
        "c. Conference and journal papers (e.g. NeurIPS, ICRL, and ICML).",
      ],
    },
    {
      id: "q22",
      question:
        "<h3>Given a PyTorch optimizer: optimizer = torch.optim.SGD(dsnn.parameters(), lr=0.01), what does optimizer.step() do and when should it be called?</h3>",
      options: [
        'a. It calculates the gradients of "dsnn" in the training loop. It should be called after the loss of the output of "dsnn" has been calculated and loss.backward() has been called.',
        'b. It increases the step size of "optimizer". It should only be called before the loss of the output of "dsnn" has been calculated and loss.backward() has been called.',
        'c. It iterates to the next batch of training data in the training loop of "dsnn". It should be called after the parameters of "dsnn" were updated.',
        'd. It carries out an update on the registered trainable parameters of "dsnn". It should be called after the loss of the output of "dsnn" has been calculated and loss.backward() has been called.',
      ],
      correctOptions: [
        'd. It carries out an update on the registered trainable parameters of "dsnn". It should be called after the loss of the output of "dsnn" has been calculated and loss.backward() has been called.',
      ],
    },
    {
      id: "q23",
      question:
        '<h3>What is a "test set" in the context of machine learning?</h3>',
      options: [
        "a. A separate set of samples used to estimate how well a model generalizes.",
        "b. A set of samples we use to pre-train our model in order to test if it would learn.",
        "c. A set of Python modules to test NN models.",
        "d. A set of samples used to train a model on and estimate how well the model generalizes.",
      ],
      correctOptions: [
        "a. A separate set of samples used to estimate how well a model generalizes.",
      ],
    },
    {
      id: "q24",
      question:
        '<h3>You get data that measures the heights of trees that grow on certain farms. The heights can take values ["tiny", "normal", "tall", "very tall"]. These values have the ranking "tiny" < "normal" < "tall" < "very tall" but the distance between the values is unknown. Which type of data is this?</h3>',
      options: [
        "a. categorical data",
        "b. continuous data",
        "c. ordinal data",
        "d. discrete data",
      ],
      correctOptions: ["c. ordinal data"],
    },
    {
      id: "q25",
      question:
        "<h3>How can hashing be useful in machine learning projects?</h3>",
      options: [
        "a. Hashing can be used to efficiently check the data for duplicates by comparing the hash values.",
        "b. Hashing can be used to efficiently check for violations of the i.i.d. property in our training set.",
        "c. Hashing can be used to efficiently train our networks by hashing its parameters.",
        "d. Hashing can be used to normalize our input data to mean=0 and variance=1.",
      ],
      correctOptions: [
        "a. Hashing can be used to efficiently check the data for duplicates by comparing the hash values.",
      ],
    },
    {
      id: "q26",
      question: "<h3>Convolutional neural networks are best described as:</h3>",
      options: [
        "a. Networks that convolve weight kernels with the input.",
        "b. Networks that always convolve weight kernels over 2 input dimensions",
        "c. Networks that are convoluted, since they have access to their previous output.",
        "d. Networks that convolve inputs with each other.",
      ],
      correctOptions: [
        "a. Networks that convolve weight kernels with the input.",
      ],
    },
    {
      id: "q27",
      question: "<h3>What is a loss function?</h3>",
      options: [
        "a. A function that takes model predictions and targets as input and returns a quality measure of the predictions.",
        "b. A function that takes model parameters and targets as input and returns a measure of hardware usage efficiency.",
        "c. A function that takes model parameters and targets as input and returns a quality measure of the model.",
        "d. A function that takes model predictions and targets as input and returns a measure of the hardware usage efficiency.",
      ],
      correctOptions: [
        "a. A function that takes model predictions and targets as input and returns a quality measure of the predictions.",
      ],
    },
    {
      id: "q28",
      question: "<h3>Training a neural network for one epoch will...</h3>",
      options: [
        "a. perform training until the model overfits on all training samples",
        "b. perform one training iteration over all training samples",
        "c. perform training for a fixed number of seconds",
        "d. perform one weight update",
      ],
      correctOptions: [
        "b. perform one training iteration over all training samples",
      ],
    },
  ],
};

export default python2_2021;
