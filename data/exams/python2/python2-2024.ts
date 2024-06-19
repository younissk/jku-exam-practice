import Test from "../../interfaces/Test";

const python2_2024: Test = {
  id: "python2_2024",
  subject: "python2",
  title: "Python 2 Test 2024",
  description: "Test your Python 2 knowledge",
  questions: [
    {
      id: "q1",
      question:
        "<h3>Given a sample image img (type PIL.Image) and a PyTorch transformation pipeline transforms (type torchvision.transforms.Compose), which of the following is the correct way of applying the transformations on the image?</h3>",
      options: [
        "transformed_img = transforms(img)",
        "transformed_img = img(transforms)",
        "transformed_img = transforms.apply(img)",
        "transformed_img = img.apply(transforms)",
      ],
      correctOptions: ["transformed_img = transforms(img)"],
    },
    {
      id: "q2",
      question:
        "<h3>Which of the following statements are correct regarding TorchScript?</h3>",
      options: [
        "TorchScript creates serializable and optimizable models from PyTorch code.",
        "With TorchScript, serialized models can be deployed in environments other than Python (e.g., C++).",
        "Every TorchScript code is also valid Python code.",
        "Every Python code is also valid TorchScript code.",
      ],
      correctOptions: [
        "TorchScript creates serializable and optimizable models from PyTorch code.",
        "With TorchScript, serialized models can be deployed in environments other than Python (e.g., C++).",
        "Every TorchScript code is also valid Python code.",
      ],
    },
    {
      id: "q3",
      question:
        '<h3>What is the output of the following code?</h3><pre>import torch\n\ndef function(x: torch.Tensor):\n    if x.sum() < 0:\n        return x * -1\n    return x\n\nscripted_function = torch.jit.script(function)\ntraced_function = torch.jit.trace(function, example_inputs=torch.tensor([3, 4]))\n\nactual_input = torch.tensor([-1, -2])\nprint("s:", scripted_function(actual_input).tolist())\nprint("t:", traced_function(actual_input).tolist())</pre>',
      options: [
        "s: [-1, -2] t: [3, 4]",
        "s: [-1, -2] t: [-1, -2]",
        "s: [-1, -2] t: [-3, -4]",
        "s: [1, 2] t: [3, 4]",
        "s: [1, 2] t: [-3, -4]",
        "s: [-1, -2] t: [1, 2]",
        "s: [1, 2] t: [-1, -2]",
        "s: [1, 2] t: [1, 2]",
      ],
      correctOptions: ["s: [1, 2] t: [-1, -2]"],
    },
    {
      id: "q4",
      question:
        "<h3>You are measuring the air temperature every day (e.g., 14.23°C, 15.01°C, etc.). Which type of data is this?</h3>",
      options: [
        "Continuous numerical data",
        "Discrete numerical data",
        "Categorical data",
        "Ordinal data",
      ],
      correctOptions: ["Continuous numerical data"],
    },
    {
      id: "q5",
      question:
        "<h3>You are given a data set from your employer for a new machine learning project. Which of the following statements should be taken into account?</h3>",
      options: [
        "The data might require preprocessing to make it work with machine learning models.",
        "The data might be incorrect (e.g., incorrect labeling).",
        "There might be more data (which your employer might not have considered as important but could still be useful).",
        "The data might include outlier values.",
      ],
      correctOptions: [
        "The data might require preprocessing to make it work with machine learning models.",
        "The data might be incorrect (e.g., incorrect labeling).",
        "There might be more data (which your employer might not have considered as important but could still be useful).",
        "The data might include outlier values.",
      ],
    },
    {
      id: "q6",
      question:
        "<h3>What is the output of the following code?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self, a):\n        super().__init__()\n        self.a = a\n\n    def forward(self, x):\n        return x + (2 * self.a)\n\nmy_module = MyModule(3)\nc = my_module(4)\nprint(c)</pre>",
      options: [
        "10",
        "It raises an exception because the parameter x is not specified as a PyTorch tensor.",
        "It raises an exception because MyModule does not have any trainable parameters.",
        "It raises an exception because self.a is not a (sub)module.",
      ],
      correctOptions: ["10"],
    },
    {
      id: "q7",
      question:
        "<h3>Which of the following statements are correct regarding model parameters and hyperparameters?</h3>",
      options: [
        "Model parameters are adjusted during model training.",
        "Hyperparameters are a subset of the model parameters.",
        "Hyperparameters might influence the model architecture.",
        "Hyperparameters and model parameters are the same thing.",
      ],
      correctOptions: [
        "Model parameters are adjusted during model training.",
        "Hyperparameters might influence the model architecture.",
      ],
    },
    {
      id: "q8",
      question:
        "<h3>Assume that MyModule is a class properly derived from the torch.nn.Module class and x, y, z are PyTorch tensors. What does the code do?</h3><pre>my_module = MyModule()\nmy_module(x, y, z)</pre>",
      options: [
        "It creates an instance of MyModule. Then it (ultimately) calls the __getitem__ method of my_module with arguments x, y, z.",
        "It creates an instance of MyModule. Then it (ultimately) calls the backward method of my_module with arguments x, y, z.",
        "It creates an instance of MyModule. Then it (ultimately) calls the forward method of my_module with arguments x, y, z.",
        "It creates an instance of MyModule. Then it (ultimately) calls the __init__ method of my_module with arguments x, y, z.",
      ],
      correctOptions: [
        "It creates an instance of MyModule. Then it (ultimately) calls the forward method of my_module with arguments x, y, z.",
      ],
    },
    {
      id: "q9",
      question:
        "<h3>Which of the following are typical data normalization/scaling approaches?</h3>",
      options: [
        "Scaling to range [-1, 1].",
        "Scaling to zero (0) mean and unit (1) variance.",
        "Scaling to range [min, max], where min and max are the minimum and maximum values of the data set.",
        "Scaling to range [0, 100].",
      ],
      correctOptions: [
        "Scaling to range [-1, 1].",
        "Scaling to zero (0) mean and unit (1) variance.",
      ],
    },
    {
      id: "q10",
      question:
        "<h3>What is the shape of the output tensor result when running the following code?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.chain = torch.nn.Sequential(\n            torch.nn.Linear(in_features=16, out_features=24),\n            torch.nn.Sigmoid(),\n            torch.nn.Linear(in_features=24, out_features=2)\n        )\n\n    def forward(self, x):\n        return self.chain(x)\n\ninp = torch.rand(size=(32, 16))\nmy_module = MyModule()\nresult = my_module(inp)</pre>",
      options: [
        "(16, 2)",
        "(32, 16)",
        "(32, 16, 2)",
        "(32, 24, 16, 2)",
        "(32, 24)",
        "(32, 24, 2)",
        "(24, 2)",
        "(32, 2)",
      ],
      correctOptions: ["(32, 2)"],
    },
    {
      id: "q11",
      question:
        "<h3>Which of the following statements are correct regarding early stopping?</h3>",
      options: [
        "Early stopping cannot guarantee the best possible model.",
        "Early stopping can reduce the number of model parameters.",
        "Early stopping cannot be applied if the loss continuously changes.",
        "Early stopping can reduce the training duration.",
      ],
      correctOptions: [
        "Early stopping cannot guarantee the best possible model.",
        "Early stopping can reduce the training duration.",
      ],
    },
    {
      id: "q12",
      question:
        "<h3>Which of the following is the correct order of performing one weight update in PyTorch (you can assume that optimizer is a valid optimizer object)?</h3>",
      options: [
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Update weights optimizer.step()\n4. Reset gradients optimizer.zero_grad()",
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Reset gradients optimizer.zero_grad()\n4. Update weights optimizer.step()",
        "1. Compute loss\n2. Update weights optimizer.step()\n3. Compute gradients loss.backward()\n4. Reset gradients optimizer.zero_grad()",
        "1. Reset gradients optimizer.zero_grad()\n2. Compute loss\n3. Update weights optimizer.step()\n4. Compute gradients loss.backward()",
      ],
      correctOptions: [
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Update weights optimizer.step()\n4. Reset gradients optimizer.zero_grad()",
      ],
    },
    {
      id: "q13",
      question:
        "<h3>Which of the following statements are correct regarding scripting and tracing to create TorchScript programs?</h3>",
      options: [
        "Scripting requires an example input.",
        "With tracing, control flow such as branching is lost.",
        "The entire program must either be scripted or traced, mixing both approaches is not allowed.",
        "Scripting and tracing can be combined.",
      ],
      correctOptions: [
        "With tracing, control flow such as branching is lost.",
        "Scripting and tracing can be combined.",
      ],
    },
    {
      id: "q14",
      question:
        "<h3>Which of the following are common steps when designing a machine learning project?</h3>",
      options: [
        "Assessing which software and hardware can and/or should be available.",
        "Considering which machine learning methods are fitting.",
        "Getting an overview of the data which is going to be used.",
        "Getting a clear definition and understanding of the project goal.",
      ],
      correctOptions: [
        "Assessing which software and hardware can and/or should be available.",
        "Considering which machine learning methods are fitting.",
        "Getting an overview of the data which is going to be used.",
        "Getting a clear definition and understanding of the project goal.",
      ],
    },
    {
      id: "q15",
      question:
        "<h3>What is the primary purpose of a torch.utils.data.DataLoader?</h3>",
      options: [
        "Loading the hyperparameters of a neural network model.",
        "Extracting the gradients from a gradient-based model.",
        "Extracting minibatches of samples from a torch.utils.data.Dataset instance.",
        "Loading the parameters of a neural network model.",
      ],
      correctOptions: [
        "Extracting minibatches of samples from a torch.utils.data.Dataset instance.",
      ],
    },
    {
      id: "q16",
      question:
        "<h3>Assume you apply the following PyTorch image transformation transform_chain to some example RGB image:</h3><pre>import torch\nfrom torchvision.transforms import v2\n\ntransform_chain = v2.Compose([\n    v2.PILToTensor(),\n    v2.ToDtype(torch.float32, scale=True),\n    v2.Resize(size=100),\n    v2.ColorJitter(),\n    v2.RandomRotation(degrees=180),\n    v2.RandomVerticalFlip(p=0.5),\n    v2.RandomHorizontalFlip(p=0.5)\n])</pre><h3>Which of the following statements are correct?</h3>",
      options: [
        "The resulting image might be rotated.",
        "The resulting image will be in grayscale.",
        "The resulting image might be vertically flipped.",
        "The resulting image will be horizontally flipped.",
        "The resulting image is either both horizontally and vertically flipped, or not flipped at all.",
        "The resulting image will be a PyTorch tensor.",
      ],
      correctOptions: [
        "The resulting image might be rotated.",
        "The resulting image might be vertically flipped.",
        "The resulting image will be a PyTorch tensor.",
      ],
    },
    {
      id: "q17",
      question:
        "<h3>In a supervised setting, how can one determine the prediction performance of some machine learning model?</h3>",
      options: [
        "By averaging the gradients of the model and comparing it to a specified threshold.",
        "By using a loss function to compute the deviation between the model prediction and the true target.",
        "By running a performance profiler on the model.",
        "By comparing the model input and the model prediction with each other.",
      ],
      correctOptions: [
        "By using a loss function to compute the deviation between the model prediction and the true target.",
      ],
    },
    {
      id: "q18",
      question:
        "<h3>The forward method of a class derived from torch.nn.Module ...</h3>",
      options: [
        "... pushes a PyTorch module to a given device.",
        '... specifies how an input is transformed into an output (the "flow" through the architecture).',
        "... adds a new forward layer to the network architecture of a module.",
        "... sets up the module architecture.",
        "... performs one weight update during training.",
      ],
      correctOptions: [
        '... specifies how an input is transformed into an output (the "flow" through the architecture).',
      ],
    },
    {
      id: "q19",
      question:
        "<h3>Which of the following statements must be taken into consideration when doing a literature review regarding a new machine learning project?</h3>",
      options: [
        "Wikis, blog posts, reddit and other similar sites can provide a good overview and introduction.",
        "If there is no matching literature, it means that the project cannot be done using machine learning.",
        "There can be research biases.",
        "Peer-reviewed literature can be a good way to get state-of-the-art information.",
      ],
      correctOptions: [
        "Wikis, blog posts, reddit and other similar sites can provide a good overview and introduction.",
        "There can be research biases.",
        "Peer-reviewed literature can be a good way to get state-of-the-art information.",
      ],
    },
    {
      id: "q20",
      question:
        "<h3>Which of the following statements are correct regarding online learning?</h3>",
      options: [
        "The batch size is a hyperparameter.",
        "Gradients might be contradicting.",
        "A single training sample is used for one update.",
        "It leads to smooth gradients.",
      ],
      correctOptions: [
        "Gradients might be contradicting.",
        "A single training sample is used for one update.",
      ],
    },
    {
      id: "q21",
      question:
        "<h3>Which of the following statements are correct when talking about normalization/scaling?</h3>",
      options: [
        "It could be that applying normalization/scaling does not have any beneficial effects.",
        "Normalization/scaling cannot be used in conjunction with cross validation.",
        "Normalization/scaling is independent from the method/model.",
        "When applying normalization/scaling in a setting with a dedicated training and test set, care must be taken which data sets to use for computing normalization constants.",
      ],
      correctOptions: [
        "It could be that applying normalization/scaling does not have any beneficial effects.",
        "When applying normalization/scaling in a setting with a dedicated training and test set, care must be taken which data sets to use for computing normalization constants.",
      ],
    },
    {
      id: "q22",
      question: "<h3>Training a neural network for one epoch will ...</h3>",
      options: [
        "... perform training for a fixed number of seconds.",
        "... perform one training iteration over all training samples.",
        "... perform one weight update.",
        "... perform training until the model overfits on all training samples.",
      ],
      correctOptions: [
        "... perform one training iteration over all training samples.",
      ],
    },
    {
      id: "q23",
      question:
        "<h3>Which of the following statements are correct regarding the following code (you can assume correct imports)?</h3><pre>def function(x):\n    if x.min() <= 0:\n        return 0\n    return x</pre>",
      options: [
        "The code\n\nscripted_function = torch.jit.script(function)\nscripted_function(torch.ones(3,))\n\nworks.",
        "The code\n\ntraced_function = torch.jit.trace(function, (torch.rand(5),))\ntraced_function(torch.ones(3,))\n\nworks.",
        "The code\n\ntraced_function = torch.jit.trace(function, (torch.rand(5),))\ntraced_function(123)\n\nworks.",
        "The code\n\nscripted_function = torch.jit.script(function)\nscripted_function(123)\n\nworks.",
      ],
      correctOptions: [
        "The code\n\ntraced_function = torch.jit.trace(function, (torch.rand(5),))\ntraced_function(torch.ones(3,))\n\nworks.",
      ],
    },
    {
      id: "q24",
      question:
        "<h3>Which of the following code snippets are correct (you can assume correct imports and that MyDataset(...) returns a valid torch.utils.data.Dataset instance)?</h3>",
      options: [
        "dataset = MyDataset(...)\nloader = DataLoader(shuffle=True, batch_size=16)\nfor data in loader(dataset):\n    # do something",
        "dataset = MyDataset(...)\nfor data in dataset:\n    loader = DataLoader(data, shuffle=True, batch_size=16)\n    samples = loader.get_minibatch()\n    # do something",
        "dataset = MyDataset(...)\nloader = DataLoader(dataset, shuffle=True, batch_size=16)\nfor data in loader:\n    # do something",
        "dataset = MyDataset(...)\nloader = DataLoader(dataset, shuffle=True, batch_size=16)\ndata = loader.get_minibatch()",
      ],
      correctOptions: [
        "dataset = MyDataset(...)\nloader = DataLoader(dataset, shuffle=True, batch_size=16)\nfor data in loader:\n    # do something",
      ],
    },
    {
      id: "q25",
      question:
        "<h3>Which of the following statements are correct regarding a hash function?</h3>",
      options: [
        "A hash function is typically used as a non-linear activation function.",
        "A hash function is used to compute a fixed-sized data vector for a given input.",
        "A hash function should have a minimal number of (hash) collisions.",
        "A hash function can be used to hash the inputs of a neural network for improved performance.",
      ],
      correctOptions: [
        "A hash function is used to compute a fixed-sized data vector for a given input.",
        "A hash function should have a minimal number of (hash) collisions.",
      ],
    },
    {
      id: "q26",
      question:
        "<h3>Assume you want to normalize your data and compute a normalization constant from your data set (e.g., the mean over many samples). What would be the correct way to proceed in terms of training, validation and test set?</h3>",
      options: [
        "Determine the constant for normalization on the training data and apply it also to the validation and test data.",
        "Determine the constant for normalization on the training and test data and apply it also to the validation data.",
        "Determine the constant for normalization on the training and validation data and apply it also to the test data.",
        "Determine the constant for normalization on the whole data set and apply it to training, validation and test data.",
        "Determine the constant for normalization on the validation and test data and apply it also to the training data.",
      ],
      correctOptions: [
        "Determine the constant for normalization on the training data and apply it also to the validation and test data.",
      ],
    },
    {
      id: "q27",
      question:
        "<h3>Assume a classification task where you want to predict the time of day based on images of analog clocks (clocks with a minute hand and hour hand) that do not have any numbers on them. In a preprocessing step, all images were centered and aligned. Which of the following augmentation techniques might be problematic?</h3>",
      options: [
        "Rotating by 180 degrees",
        "Flipping vertically",
        "Flipping horizontally",
        "Rotating by 90 degrees",
      ],
      correctOptions: [
        "Rotating by 180 degrees",
        "Flipping vertically",
        "Flipping horizontally",
        "Rotating by 90 degrees",
      ],
    },
    {
      id: "q28",
      question:
        "<h3>Which of the following statements are correct regarding cross validation?</h3>",
      options: [
        "Cross validation is helpful to utilize all samples for evaluating the model performance.",
        "k-fold cross validation means that the entire data set is split into k non-overlapping parts, (k-1) of which are used for training and the remaining one for testing (per iteration).",
        "Cross validation can only be used for small data sets.",
        "k-fold cross validation means that the entire data set is split into k non-overlapping parts, (k-1) of which are used for testing and the remaining one for training (per iteration).",
      ],
      correctOptions: [
        "Cross validation is helpful to utilize all samples for evaluating the model performance.",
        "k-fold cross validation means that the entire data set is split into k non-overlapping parts, (k-1) of which are used for training and the remaining one for testing (per iteration).",
      ],
    },
    {
      id: "q29",
      question:
        "<h3>The special method __getitem__ in a torch.utils.data.Dataset derived class should ...</h3>",
      options: [
        "... return one sample.",
        "... return all samples.",
        "... return minibatched samples.",
        "... return the data set.",
      ],
      correctOptions: ["... return one sample."],
    },
    {
      id: "q30",
      question:
        "<h3>Assume you have the following categorical data in exactly this fixed order: flower, tree, earth, water. You are asked to create a one-hot encoding. Which of the following is the correct one-hot encoded representation of earth?</h3>",
      options: [
        "(0, 0, 1, 0)",
        "(1, 1, 1, 1)",
        "(0, 1, 0, 0)",
        "(1, 0, 0, 0)",
        "(0, 0, 0, 0)",
        "(0, 0, 0, 1)",
        "(1, 0, 1, 1)",
      ],
      correctOptions: ["(0, 0, 1, 0)"],
    },
    {
      id: "q31",
      question:
        "<h3>Which of the following statements are correct regarding monitoring a model during training?</h3>",
      options: [
        "Switching on monitoring improves the performance of the model.",
        "It enables an easier detection of over- or underfitting.",
        "It allows inspecting weights and gradients and how they change during training.",
        "It allows inspecting the losses and how they change during training.",
      ],
      correctOptions: [
        "It enables an easier detection of over- or underfitting.",
        "It allows inspecting weights and gradients and how they change during training.",
        "It allows inspecting the losses and how they change during training.",
      ],
    },
    {
      id: "q32",
      question:
        "<h3>Assume you have the following binary confusion matrix:</h3><pre>\n                      Predicted\n                 positive   negative\n------------------------------------\nActual positive |   40         10  |\n       negative |   35         15  |\n------------------------------------\n</pre><h3>Which of the following statements are correct?</h3>",
      options: [
        "There are 35 true positives.",
        "The classification performance is perfect.",
        "Out of all samples, the used model predicted 50 to be positive.",
        "The used model is more likely to predict the positive class.",
      ],
      correctOptions: [
        "The used model is more likely to predict the positive class.",
      ],
    },
    {
      id: "q33",
      question:
        "<h3>Which statements regarding PyTorch's torch.nn.Module are correct?</h3>",
      options: [
        "The __init__ method sets up the model architecture.",
        'The __getitem__ method specifies how an input is transformed into an output (the "flow" through the architecture).',
        "It must not contain trainable parameters (torch.nn.Parameter).",
        "It is the base class for all neural network modules.",
      ],
      correctOptions: [
        "The __init__ method sets up the model architecture.",
        "It is the base class for all neural network modules.",
      ],
    },
    {
      id: "q34",
      question:
        "<h3>You are training a neural network model using some gradient-based iterative method. The first training loss that you compute is quite high, but continuing the training process does not change the loss in any way, i.e., it remains constant. Which of the following statements are correct?</h3>",
      options: [
        "The gradients are too big.",
        "The model is overfitting.",
        "The model is perfect (for every sample, it computes the expected output value).",
        "The model weights are not changed.",
      ],
      correctOptions: ["The model weights are not changed."],
    },
    {
      id: "q35",
      question: '<h3>What is the term "generalization" about?</h3>',
      options: [
        "It tells us how well our model will perform on future (unseen) data.",
        "A model that fits the training data well will also generalize well.",
        "It is about trying to find a model which overfits the data.",
        "Using a dedicated test set is important for evaluating the generalization capability of a model.",
      ],
      correctOptions: [
        "It tells us how well our model will perform on future (unseen) data.",
        "Using a dedicated test set is important for evaluating the generalization capability of a model.",
      ],
    },
    {
      id: "q36",
      question:
        "<h3>Which of the following statements are true regarding data augmentation?</h3>",
      options: [
        "Data augmentation can reduce overfitting.",
        "Data augmentation can have a negative impact on the model performance.",
        "Data augmentation must only be applied on the evaluation set, not on the training set.",
        "Data augmentation is about deleting existing samples to balance the data set.",
      ],
      correctOptions: [
        "Data augmentation can reduce overfitting.",
        "Data augmentation can have a negative impact on the model performance.",
      ],
    },
    {
      id: "q37",
      question: "<h3>Categorical data can be described as:</h3>",
      options: [
        "Quantitative data with mathematical meaning but without a natural ordering.",
        "Qualitative data without mathematical meaning.",
        "Quantitative data with mathematical meaning.",
        "Qualitative data with mathematical meaning.",
        "Quantitative data without mathematical meaning.",
        "Qualitative data without mathematical meaning but with a natural ordering.",
      ],
      correctOptions: ["Qualitative data without mathematical meaning."],
    },
    {
      id: "q38",
      question:
        "<h3>Which statements regarding PyTorch's automatic parameter registration of a torch.nn.Module are correct?</h3>",
      options: [
        "When assigned as attribute, a torch.Tensor will automatically be registered.",
        "When assigned as attribute, the trainable parameters of a torch.nn.Module (or submodule) will automatically be registered.",
        "If a module does not have any automatically registered parameters, an exception is raised.",
        "Calling the forward method of a torch.nn.Module is redundant if all parameters have already been registered automatically.",
      ],
      correctOptions: [
        "When assigned as attribute, the trainable parameters of a torch.nn.Module (or submodule) will automatically be registered.",
      ],
    },
  ],
};

export default python2_2024;
