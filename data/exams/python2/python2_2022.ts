import Test from "../../interfaces/Test";

const python2_2022: Test = {
  id: "python2-2022",
  subject: "python2",
  title: "Python 2 Test 2022",
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
        "<h3>What is the main purpose of a version control system (VCS)?</h3>",
      options: [
        "a. Automatic usage of the most recent Python package versions.",
        "b. Efficient tracking of files and their changes.",
        "c. Keeping all software versions up to date.",
        "d. Fast integration of unit tests.",
      ],
      correctOptions: ["b. Efficient tracking of files and their changes."],
    },
    {
      id: "q3",
      question:
        '<h3>Assume that you have a classification task where you want to classify images into either "dog" or "cat". Each image only contains a single dog or a single cat on some arbitrary background. Which of the following data augmentation techniques does NOT make sense?</h3>',
      options: [
        "a. adding noise",
        "b. applying input dropout",
        "c. zooming into the background",
        "d. flipping horizontally",
      ],
      correctOptions: ["c. zooming into the background"],
    },
    {
      id: "q4",
      question:
        "<h3>Which of the following is NOT a typical data normalization/scaling approach?</h3>",
      options: [
        "a. Scaling to range [-1, 1].",
        "b. Scaling to zero (0) mean and unit (1) variance.",
        "c. Scaling to range [0, 1].",
        "d. Scaling to range [0, 10^-15]",
      ],
      correctOptions: ["d. Scaling to range [0, 10^-15]"],
    },
    {
      id: "q5",
      question:
        "<h3>What is one primary purpose of the automatic parameter registration of torch.nn.Module?</h3>",
      options: [
        "a. To allow for easier debugging.",
        "b. To allow more inputs to the forward method.",
        "c. To collect all trainable parameters and provide convenient access to them via the module's parameters method.",
        "d. To keep track of all parameters and assess whether they can be removed in order to increase performance.",
      ],
      correctOptions: [
        "c. To collect all trainable parameters and provide convenient access to them via the module's parameters method.",
      ],
    },
    {
      id: "q6",
      question:
        "<h3>Assume you have the raw model outputs logits as a PyTorch tensor with arbitrary floating point numbers in the range [-100, 100]. Which of the following code snippets is correct when the task is to get binary classification predictions preds (integer, either 0 or 1), given some prediction threshold t (float) in the range [0, 1] (assume correct imports)?</h3>",
      options: [
        "a. preds = (logits >= t).long()",
        "b. preds = (torch.sigmoid(logits) * t).long()",
        "c. preds = (torch.sigmoid(logits) >= t).long()",
        "d. preds = logits.long() >= t",
        "e. preds = (logits * t).long()",
        "f. preds = torch.sigmoid(logits).long() >= t",
      ],
      correctOptions: ["c. preds = (torch.sigmoid(logits) >= t).long()"],
    },
    {
      id: "q7",
      question:
        "<h3>What does the following PyTorch image transformation composition do when applied on an image?</h3><pre>transforms = transforms.Compose([\n    transforms.Resize(4),\n    transforms.Grayscale(),\n    transforms.RandomRotation(degrees=180),\n    transforms.ToTensor()\n])</pre>",
      options: [
        "a. It sequentially resizes an image, converts it to grayscale, applies randomized rotation and transforms it to a PyTorch tensor.",
        "b. It randomly performs one of the four transformations on an image.",
        "c. It randomly performs arbitrary many of the four transformations on an image.",
        "d. It sequentially transforms an image to a PyTorch tensor, applies randomized rotation, converts it to grayscale and resizes it.",
      ],
      correctOptions: [
        "a. It sequentially resizes an image, converts it to grayscale, applies randomized rotation and transforms it to a PyTorch tensor.",
      ],
    },
    {
      id: "q8",
      question:
        "<h3>Select the correct solution when asked to normalize (scale to range [0, 1]) some numpy array arr.</h3>",
      options: [
        "a. arr * 0 + (1 * arr)",
        "b. (arr - arr.mean()) / arr.std()",
        "c. arr / 255",
        "d. (arr - arr.min()) / (arr.max() - arr.min())",
      ],
      correctOptions: ["d. (arr - arr.min()) / (arr.max() - arr.min())"],
    },
    {
      id: "q9",
      question:
        "<h3>You get data that measures the times it took for trees to grow. The measured times can be any real numbers in range [0, 1000]. Which type of data is this?</h3>",
      options: [
        "a. categorical data",
        "b. continuous data",
        "c. ordinal data",
        "d. discrete data",
      ],
      correctOptions: ["b. continuous data"],
    },
    {
      id: "q10",
      question: "<h3>The forward method in context of torch.nn.Module...</h3>",
      options: [
        "a. ...defines the module architecture.",
        'b. ...specifies how a PyTorch module is applied (the "flow" through the module architecture).',
        "c. ...pushes a PyTorch module to a given device.",
        "d. ...adds a new forward layer to the network architecture of a module.",
      ],
      correctOptions: [
        'b. ...specifies how a PyTorch module is applied (the "flow" through the module architecture).',
      ],
    },
    {
      id: "q11",
      question: "<h3>Categorical data can be described as:</h3>",
      options: [
        "a. Quantitative data with mathematical meaning and a natural ordering.",
        "b. A subset of numerical data with continuous values.",
        "c. Qualitative data without mathematical meaning but with a natural ordering.",
        "d. Qualitative data without mathematical meaning.",
      ],
      correctOptions: ["d. Qualitative data without mathematical meaning."],
    },
    {
      id: "q12",
      question:
        "<h3>What does independently and identically distributed (i.i.d.) mean?</h3>",
      options: [
        "a. Each sample has the same probability distribution as the others and all are mutually independent.",
        "b. Each sample has a different probability distribution as the others and all are mutually dependent.",
        "c. Each sample has the same probability distribution as the others and all are mutually dependent.",
        "d. Each sample has a different probability distribution as the others and all are mutually independent.",
      ],
      correctOptions: [
        "a. Each sample has the same probability distribution as the others and all are mutually independent.",
      ],
    },
    {
      id: "q13",
      question: "<h3>What is the purpose of a loss function?</h3>",
      options: [
        "a. To get the predictions of a model.",
        "b. To change the model parameters.",
        "c. To compute the difference between the model output and the actual targets (ground truth).",
        "d. To compute the gradients for gradient-based iterative methods.",
      ],
      correctOptions: [
        "c. To compute the difference between the model output and the actual targets (ground truth).",
      ],
    },
    {
      id: "q14",
      question:
        "<h3>Assume that MyModule is a class properly derived from the torch.nn.Module class and tensor_a is a PyTorch tensor. What does the following code do?</h3><pre>my_module = MyModule()\nmy_module(tensor_a)</pre>",
      options: [
        "a. It raises an exception, since one can not create instances of MyModule.",
        "b. Creates an instance of MyModule. Then reads a sample into tensor_a.",
        "c. Creates an instance of MyModule. Then applies the forward method of my_module with argument tensor_a.",
        "d. Creates an instance of MyModule. Then calls the __getitem__ method of my_module with argument tensor_a.",
      ],
      correctOptions: [
        "c. Creates an instance of MyModule. Then applies the forward method of my_module with argument tensor_a.",
      ],
    },
    {
      id: "q15",
      question:
        '<h3>What is the output of the following code?</h3><pre>import torch\nfrom torch.utils.data import Dataset, DataLoader\n\nclass MyDataset(Dataset):\n    def __getitem__(self, index):\n        return torch.tensor([1, 2, 3])\n\n    def __len__(self):\n        return 4\n\ndataset = MyDataset()\nloader = DataLoader(dataset, batch_size=2)\n\nfor i, x in enumerate(loader):\n    print(f"{i}: {tuple(x.shape)}")</pre>',
      options: [
        "a. 0: (3, 2)\n1: (3, 2)",
        "b. 0: (2, 3)\n1: (2, 3)",
        "c. 0: (4, 3)",
        "d. 0: (6,)",
        "e. 0: (4, 2, 3)",
        "f. 0: (3,)\n1: (3,)\n2: (3,)\n3: (3,)",
      ],
      correctOptions: ["b. 0: (2, 3)\n1: (2, 3)"],
    },
    {
      id: "q16",
      question: "<h3>What can be a potential risk of data augmentation?</h3>",
      options: [
        "a. It can introduce artifacts or even change the task.",
        "b. There are no risks, data augmentation is always safe.",
        "c. It can increase the model complexity.",
        "d. It can increase the number of trainable parameters of a model.",
      ],
      correctOptions: [
        "a. It can introduce artifacts or even change the task.",
      ],
    },
    {
      id: "q17",
      question:
        '<h3>Why is the following code problematic (you can assume correct inputs, shapes and arguments)?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv = torch.nn.Conv2d(...)\n\n    def forward(self, x):\n        out1 = self.conv(x)\n        ...  # process "out1" so it can be an input to "linear"\n        linear = torch.nn.Linear(...)\n        out2 = linear(out1)\n        return out2</pre>',
      options: [
        "a. torch.nn.Linear is assigned to a local identifier but torch.nn.Conv2d is not. Both should be defined to locals or the code will suffer from reproducibility.",
        "b. torch.nn.Linear must be invoked before passing the data to the convolutional layer.",
        "c. torch.nn.Conv2d can never be combined with torch.nn.Linear.",
        "d. The submodule torch.nn.Linear is created inside the forward method rather than the __init__ method. This means that the submodule is repeatedly created in every forward call, including its random parameter initialization.",
      ],
      correctOptions: [
        "d. The submodule torch.nn.Linear is created inside the forward method rather than the __init__ method. This means that the submodule is repeatedly created in every forward call, including its random parameter initialization.",
      ],
    },
    {
      id: "q18",
      question:
        "<h3>torch.utils.data.Dataset can be used to derive a custom class that...</h3>",
      options: [
        "a. ...specifies that architecture of a neural network model.",
        "b. ...provides access to data via a standardized interface.",
        "c. ...takes care of multiprocessing.",
        "d. ...creates minibatches from samples.",
      ],
      correctOptions: [
        "b. ...provides access to data via a standardized interface.",
      ],
    },
    {
      id: "q19",
      question:
        "<h3>What is the output of the following code?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self, a):\n        super().__init__()\n        self.a = a\n\n    def forward(self, x):\n        output = x + self.a\n        return output\n\nmy_module = MyModule(2.0)\nc = my_module(5.0)\nprint(c)</pre>",
      options: [
        "a. It raises an exception because super().__init__() should not be used with torch.nn.Module.",
        "b. It raises an exception because the __getitem__ method is missing in MyModule.",
        "c. 7.0",
        "d. It raises an exception at self.a = a because only PyTorch trainable parameters and submodules can be used as attribute.",
      ],
      correctOptions: ["c. 7.0"],
    },
    {
      id: "q20",
      question:
        "<h3>Consider a binary classification task, where you have to classify patients into either healthy (negative) or diseased (positive). Your dataset is imbalanced, there are far more healthy patients than diseased patients. Which of the following evaluation metrics is the most fitting one to assess a model performance?</h3>",
      options: [
        "a. area under the receiver operating characteristic (ROC) curve (AUC)",
        "b. true negative rate (TNR)",
        "c. mean squared error (MSE)",
        "d. accuracy (ACC)",
      ],
      correctOptions: [
        "a. area under the receiver operating characteristic (ROC) curve (AUC)",
      ],
    },
    {
      id: "q21",
      question:
        "<h3>Assume you want to normalize your data and compute a normalization constant from your dataset (e.g., the mean over many samples). What would be the correct way to proceed in terms of training and test set?</h3>",
      options: [
        "a. Determine the constant for normalization on the training data and apply it also to the test data.",
        "b. Determine the constant for normalization on the whole dataset and apply it to training and test data.",
        "c. Determine the constant for normalization on the test data and apply it also to the training data.",
        "d. Determine the constant for normalization on a random set of samples from training and test data and apply it to training and test data.",
      ],
      correctOptions: [
        "a. Determine the constant for normalization on the training data and apply it also to the test data.",
      ],
    },
    {
      id: "q22",
      question:
        "<h3>Which of the following statements is NOT correct regarding the following hash function:</h3><pre>def my_hash(x):\n    return 125</pre>",
      options: [
        "a. The hash value is the same in different Python interpreter sessions.",
        "b. The computation of the hash value is fast.",
        "c. Up to 125 hash collisions can occur for unequal inputs.",
        "d. The hash function will work on any input.",
      ],
      correctOptions: [
        "c. Up to 125 hash collisions can occur for unequal inputs.",
      ],
    },
    {
      id: "q23",
      question:
        "<h3>When translating PyTorch/Python code into a TorchScript program, there are two ways: scripting and tracing. Which of the following statements is correct?</h3>",
      options: [
        "a. Scripting: recording the operations of a PyTorch/Python program given some example input; control flow is ignored\nTracing: writing a TorchScript program directly; control flow is supported",
        "b. Scripting: writing a TorchScript program directly; control flow is ignored\nTracing: recording the operations of a PyTorch/Python program given some example input; control flow is supported",
        "c. Scripting: recording the operations of a PyTorch/Python program given some example input; control flow is supported\nTracing: writing a TorchScript program directly; control flow is ignored",
        "d. Scripting: writing a TorchScript program directly; control flow is supported\nTracing: recording the operations of a PyTorch/Python program given some example input; control flow is ignored",
      ],
      correctOptions: [
        "d. Scripting: writing a TorchScript program directly; control flow is supported\nTracing: recording the operations of a PyTorch/Python program given some example input; control flow is ignored",
      ],
    },
    {
      id: "q24",
      question:
        "<h3>Consider the following incomplete implementation of a custom Dataset which should return image data as numpy arrays (assume read_image to be fully implemented):</h3><pre>import numpy as np\nfrom torch.utils.data import Dataset\n\ndef read_image(path: str) -> np.ndarray:\n    # reads an image from the path and returns a numpy array\n    ...\n\nclass MyDataset(Dataset):\n    def __init__(self, image_paths: list[str]):\n        self.image_paths = image_paths</pre><p>Which of the following is the correct implementation of the missing __getitem__ method?</p>",
      options: [
        "a. def __getitem__(self, path):\n    return read_image(path)",
        "b. def __getitem__(self, index):\n    return np.array([index])",
        "c. def __getitem__(self, index):\n    path = self.image_paths[index]\n    return read_image(path)",
        "d. def __getitem__(self, index):\n    data = []\n    for path in self.image_paths:\n        data.append(read_image(path))\n    return data",
      ],
      correctOptions: [
        "c. def __getitem__(self, index):\n    path = self.image_paths[index]\n    return read_image(path)",
      ],
    },
    {
      id: "q25",
      question:
        "<h3>Which is the correct way to perform an update step on network parameters after the forward pass in PyTorch?</h3>",
      options: [
        "a. Set gradients to zero, calculate the loss, call backward() on the optimizer, call step() on the optimizer.",
        "b. Set gradients to zero, calculate the loss, call backward() on the loss, call step() on the optimizer.",
        "c. Set gradients to zero, calculate the loss, call backward() on the optimizer, call step() on the network.",
        "d. Set gradients to zero, calculate the loss, call backward() on the loss, call step() on the network.",
      ],
      correctOptions: [
        "b. Set gradients to zero, calculate the loss, call backward() on the loss, call step() on the optimizer.",
      ],
    },
    {
      id: "q26",
      question:
        "<h3>What does collate_fn (collate function) do in terms of torch.utils.data.DataLoader?</h3>",
      options: [
        "a. Specifies how a sample is loaded from the disk.",
        "b. Applies data augmentation methods to the samples.",
        "c. Specifies how the samples are combined into minibatches.",
        "d. Specifies the size of the subsets of the dataset.",
      ],
      correctOptions: [
        "c. Specifies how the samples are combined into minibatches.",
      ],
    },
    {
      id: "q27",
      question: "<h3>What is the purpose of the zero_grad method?</h3>",
      options: [
        "a. It is called on the loss (loss.zero_grad()) to set the associated trainable parameters to values for which the loss is zero.",
        "b. It is called on the optimizer (optim.zero_grad()) in order to set the associated trainable parameters to zero after a gradient update.",
        "c. It is called on the optimizer (optim.zero_grad()) in order to set the gradients of the associated trainable parameters to zero.",
        "d. It is called on the loss (loss.zero_grad()) to set the associated trainable parameters to values for which the loss has a vanishing gradient.",
      ],
      correctOptions: [
        "c. It is called on the optimizer (optim.zero_grad()) in order to set the gradients of the associated trainable parameters to zero.",
      ],
    },
    {
      id: "q28",
      question:
        "<h3>An instance of the torch.utils.data.DataLoader class...</h3>",
      options: [
        "a. ...creates minibatches from the samples returned by a torch.utils.data.Dataset instance.",
        "b. ...represents a PyTorch Dataset and must include a __getitem__ method.",
        "c. ...splits the dataset into training and test set automatically.",
        "d. ...must be passed to a PyTorch model and will automatically train it on all samples in the dataset.",
      ],
      correctOptions: [
        "a. ...creates minibatches from the samples returned by a torch.utils.data.Dataset instance.",
      ],
    },
    {
      id: "q29",
      question: "<h3>The __init__ method in context of torch.nn.Module...</h3>",
      options: [
        'a. ...specifies how a PyTorch module is applied (the "flow" through the module architecture).',
        "b. ...defines the module architecture.",
        "c. ...initializes all sub-modules based on the super-class.",
        "d. ...is a replacement for torch.nn.init.",
      ],
      correctOptions: ["b. ...defines the module architecture."],
    },
    {
      id: "q30",
      question:
        "<h3>What can be a potential benefit of data augmentation?</h3>",
      options: [
        "a. Overfitting can be reduced.",
        "b. The computational run time of the model can be increased.",
        "c. The computational run time of the model can be reduced.",
        "d. Overfitting can be increased.",
      ],
      correctOptions: ["a. Overfitting can be reduced."],
    },
    {
      id: "q31",
      question:
        '<h3>What is the output of the following code?</h3><pre>import torch\n\ndef function(x: torch.Tensor):\n    return x if x.min() >= 0 else x * -1\n\nscripted_function = torch.jit.script(function)\ntraced_function = torch.jit.trace(function, example_inputs=torch.tensor([1, 2, 3]))\n\nactual_input = torch.tensor([-4, -5, -6])\nprint("s:", scripted_function(actual_input).tolist())\nprint("t:", traced_function(actual_input).tolist())</pre>',
      options: [
        "a. s: [-4, -5, -6]\nt: [4, 5, 6]",
        "b. s: [4, 5, 6]\nt: [-1, -2, -3]",
        "c. s: [-4, -5, -6]\nt: [-1, -2, -3]",
        "d. s: [4, 5, 6]\nt: [1, 2, 3]",
        "e. s: [4, 5, 6]\nt: [-4, -5, -6]",
        "f. s: [-4, -5, -6]\nt: [-4, -5, -6]",
        "g. s: [4, 5, 6]\nt: [4, 5, 6]",
        "h. s: [-4, -5, -6]\nt: [1, 2, 3]",
      ],
      correctOptions: ["e. s: [4, 5, 6]\nt: [-4, -5, -6]"],
    },
    {
      id: "q32",
      question:
        "<h3>Given a PyTorch optimizer optim = torch.optim.SGD(my_model.parameters(), lr=0.01), what does optim.step() do and when should it be called?</h3>",
      options: [
        "a. It carries out an update on the registered trainable parameters of my_model. It should be called after the loss of the output of my_model has been calculated and loss.backward() has been called.",
        "b. It iterates to the next batch of training data in the training loop of my_model. It should be called after a the parameters of my_model were updated.",
        "c. It increases the step size of optim. It should only be called before the loss of the output of my_model has been calculated and loss.backward() has been called.",
        "d. It calculates the gradients of my_model in the training loop. It should be called after the loss of the output of my_model has been calculated and loss.backward() has been called.",
      ],
      correctOptions: [
        "a. It carries out an update on the registered trainable parameters of my_model. It should be called after the loss of the output of my_model has been calculated and loss.backward() has been called.",
      ],
    },
    {
      id: "q33",
      question: "<h3>What is a common loss function for regression tasks?</h3>",
      options: [
        "a. mean squared error",
        "b. cross entropy",
        "c. binary cross entropy",
        "d. stochastic gradient descent",
      ],
      correctOptions: ["a. mean squared error"],
    },
    {
      id: "q34",
      question: "<h3>What is the primary task of a hash function?</h3>",
      options: [
        "a. To compute whether two objects are equal.",
        "b. To compute a fixed-sized data vector for a given input.",
        "c. To make implementations of dictionaries and sets fast (high run-time performance).",
        "d. To compare image data.",
      ],
      correctOptions: [
        "b. To compute a fixed-sized data vector for a given input.",
      ],
    },
    {
      id: "q35",
      question: "<h3>Which statement is NOT true about torch.nn.Module?</h3>",
      options: [
        "a. Trainable parameters are automatically registered when specified as attributes in the __init__ method.",
        "b. torch.nn.Module can be used to implement custom neural networks in PyTorch.",
        "c. PyTorch datasets are automatically registered when specified as attributes in the __init__ method.",
        "d. Other PyTorch modules are automatically registered when specified as attributes in the __init__ method.",
      ],
      correctOptions: [
        "c. PyTorch datasets are automatically registered when specified as attributes in the __init__ method.",
      ],
    },
    {
      id: "q36",
      question:
        "<h3>When training a model using some gradient-based iterative method, how should the loss (computed with some loss function) change?</h3>",
      options: [
        "a. The loss should be minimized.",
        "b. The loss is irrelevant when training a model.",
        "c. The loss should be maximized.",
        "d. The loss should nearly stay constant (given some user-defined value).",
      ],
      correctOptions: ["a. The loss should be minimized."],
    },
    {
      id: "q37",
      question:
        "<h3>When creating randomized data splits, a common thing to do is setting the seed of the used random number generators. Why is that?</h3>",
      options: [
        "a. To enable shuffling in the DataLoader instances.",
        "b. To make different libraries compatible with each other (e.g., data from numpy and data from torch).",
        "c. To allow for a faster program execution, as the seed is now just a constant.",
        "d. To get reproducible results, so that the splits always contain the same (randomized) samples.",
      ],
      correctOptions: [
        "d. To get reproducible results, so that the splits always contain the same (randomized) samples.",
      ],
    },
    {
      id: "q38",
      question: "<h3>What does a binary confusion matrix contain?</h3>",
      options: [
        "a. Given regression predictions and the actual targets, it contains the counts how often the model was close, given some threshold.",
        "b. It contains the loss values of all iterations of a nested cross validation.",
        "c. Given some loss functions, it contains the minimum and maximum loss values of these functions.",
        "d. Given classification predictions and the actual targets, it contains the counts how often the model was correct and incorrect.",
      ],
      correctOptions: [
        "d. Given classification predictions and the actual targets, it contains the counts how often the model was correct and incorrect.",
      ],
    },
    {
      id: "q39",
      question:
        "<h3>In a supervised setting, how can one determine the performance of some machine learning model?</h3>",
      options: [
        "a. By using a loss function to compute the deviation between the model prediction and the true target.",
        "b. By averaging the gradients of the model and compare it to a specified threshold.",
        "c. By running a performance profiler on the model.",
        "d. By comparing the model input and the model prediction with each other.",
      ],
      correctOptions: [
        "a. By using a loss function to compute the deviation between the model prediction and the true target.",
      ],
    },
    {
      id: "q40",
      question: "<h3>torch.utils.data.Subset can be used to...</h3>",
      options: [
        "a. ...derive a custom class that creates minibatches from samples.",
        "b. ...generate a Dataset from a subset of the original Dataset according to a list of indices.",
        "c. ...distribute the sampling process over multiple sub-processes.",
        "d. ...find a good subset of the input features, e.g., for dimensionality reduction.",
      ],
      correctOptions: [
        "b. ...generate a Dataset from a subset of the original Dataset according to a list of indices.",
      ],
    },
    {
      id: "q41",
      question:
        "<h3>Given a sample image img (type PIL.Image) and a PyTorch transformation pipeline transforms (type torchvision.transforms.Compose), which of the following is the correct way of applying the transformations on the image?</h3>",
      options: [
        "a. transformed_img = img.apply(transforms)",
        "b. transformed_img = transforms(img)",
        "c. transformed_img = img(transforms)",
        "d. transformed_img = transforms.apply(img)",
      ],
      correctOptions: ["b. transformed_img = transforms(img)"],
    },
    {
      id: "q42",
      question:
        "<h3>Which training method corresponds to full-batch learning?</h3>",
      options: [
        "a. Train a model on individual data samples from the training dataset in each update.",
        "b. Divide the full training dataset into batches of several samples and use one batch per update.",
        "c. Train a model on the whole training dataset in each update.",
        "d. Divide the full training and test dataset into batches of several samples and use one batch per update.",
      ],
      correctOptions: [
        "c. Train a model on the whole training dataset in each update.",
      ],
    },
    {
      id: "q43",
      question:
        "<h3>The special method __getitem__ in a torch.utils.data.Dataset derived class should...</h3>",
      options: [
        "a. ...calculate the mean of all samples.",
        "b. ...return minibatched samples.",
        "c. ...return one sample.",
        "d. ...return the index of a specified sample.",
      ],
      correctOptions: ["c. ...return one sample."],
    },
    {
      id: "q44",
      question: "<h3>What is a hash collision?</h3>",
      options: [
        "a. Equal inputs result in the same hash code.",
        "b. Different inputs result in different hash codes.",
        "c. Equal inputs result in different hash codes.",
        "d. Different inputs result in the same hash code.",
      ],
      correctOptions: ["d. Different inputs result in the same hash code."],
    },
    {
      id: "q45",
      question: "<h3>What is data augmentation?</h3>",
      options: [
        "a. Creating new artificial samples by modifying existing samples.",
        "b. Randomly swapping targets/labels of samples while keeping the features the same.",
        "c. Creating data splits (training, validation, test splits).",
        "d. Creating new models by choosing different parameters.",
      ],
      correctOptions: [
        "a. Creating new artificial samples by modifying existing samples.",
      ],
    },
    {
      id: "q46",
      question: "<h3>Training a neural network for one epoch will...</h3>",
      options: [
        "a. ...perform one weight update.",
        "b. ...perform training until the model overfits on all training samples.",
        "c. ...perform training for a fixed number of seconds.",
        "d. ...perform one training iteration over all training samples.",
      ],
      correctOptions: [
        "d. ...perform one training iteration over all training samples.",
      ],
    },
  ],
};

export default python2_2022;
