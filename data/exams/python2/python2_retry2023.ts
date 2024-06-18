export default {
  id: "python2-retry-2023",
  subject: "python2",
  title: "Python 2 Test 2023 (Retry)",
  description: "Test your Python 2 knowledge (Retry)",
  questions: [
    {
      id: "q1",
      question:
        '<h3>By selecting "I confirm", I hereby declare under oath that I will work on this examination on my own without any help or any third-party assistance.</h3><p>By selecting "I confirm", I understand that noncompliance results in invalidation of the assessment, whereby the invalidated examination will be added to the total number of retakes and noncompliance may result in further legal action.</p>',
      options: ["I do not confirm", "I confirm"],
      correctOptions: ["I confirm"],
    },
    {
      id: "q2",
      question:
        "<h3>The __init__ method of a class derived from torch.nn.Module...</h3>",
      options: [
        "... is a shortcut for torch.nn.init.",
        "... initializes all submodules based on the superclass.",
        '... specifies how a PyTorch module is applied (the "flow" through the module architecture).',
        "... sets up the module architecture.",
      ],
      correctOptions: ["... sets up the module architecture."],
    },
    {
      id: "q3",
      question:
        "<h3>Given a sample image img (type PIL.Image) and a PyTorch transformation pipeline transforms (type torchvision.transforms.Compose), which of the following is the correct way of applying the transformations on the image?</h3>",
      options: [
        "transformed_img = transforms(img)",
        "transformed_img = transforms.apply(img)",
        "transformed_img = img.apply(transforms)",
        "transformed_img = img(transforms)",
      ],
      correctOptions: ["transformed_img = transforms(img)"],
    },
    {
      id: "q4",
      question:
        "<h3>Which of the following are typical data normalization/scaling approaches?</h3>",
      options: [
        "Scaling to range [-1, 1].",
        "Scaling to zero (0) mean and unit (1) variance.",
        "Scaling to range [0, 100].",
        "Scaling to range [1, 2].",
      ],
      correctOptions: [
        "Scaling to range [-1, 1].",
        "Scaling to zero (0) mean and unit (1) variance.",
      ],
    },
    {
      id: "q5",
      question: "<h3>What can be potential benefits of data augmentation?</h3>",
      options: [
        "Underfitting can be reduced.",
        "Overfitting can be reduced.",
        "The robustness of the model can be increased.",
        "The robustness of the model can be reduced.",
      ],
      correctOptions: [
        "Overfitting can be reduced.",
        "The robustness of the model can be increased.",
      ],
    },
    {
      id: "q6",
      question:
        '<h3>What is meant by the term "regularization" in the context of machine learning?</h3>',
      options: [
        "Input feature normalization.",
        "Choosing the correct activation function.",
        "Choosing the correct loss function.",
        "Techniques to reduce overfitting.",
      ],
      correctOptions: ["Techniques to reduce overfitting."],
    },
    {
      id: "q7",
      question:
        "<h3>When training a model using some gradient-based iterative method, what does it mean when the training loss increases?</h3>",
      options: [
        "It means that the model is not learning properly.",
        "It means that the model outputs are getting closer to the true target values.",
        "It means that the model is overfitting.",
        "It means that the model outputs are getting farther away from the true target values.",
      ],
      correctOptions: [
        "It means that the model outputs are getting farther away from the true target values.",
        "It means that the model is not learning properly.",
      ],
    },
    {
      id: "q8",
      question:
        "<h3>What is a hyperparameter in the setting of machine learning?</h3>",
      options: [
        "It represents an internal model parameter that is adjusted during training.",
        "It represents a user-specified parameter that typically influences the model and/or training procedure.",
        "It represents the process of training and evaluating an algorithm.",
        "It represents a machine learning model class.",
      ],
      correctOptions: [
        "It represents a user-specified parameter that typically influences the model and/or training procedure.",
      ],
    },
    {
      id: "q9",
      question:
        "<h3>Which of the following is the correct order of performing one weight update in PyTorch (you can assume that optimizer is a valid PyTorch optimizer object)?</h3>",
      options: [
        "1. Compute loss\n2. Update weights optimizer.step()\n3. Compute gradients loss.backward()\n4. Reset gradients optimizer.zero_grad()",
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Update weights optimizer.step()\n4. Reset gradients optimizer.zero_grad()",
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Reset gradients optimizer.zero_grad()\n4. Update weights optimizer.step()",
        "1. Reset gradients optimizer.zero_grad()\n2. Compute loss\n3. Update weights optimizer.step()\n4. Compute gradients loss.backward()",
      ],
      correctOptions: [
        "1. Compute loss\n2. Compute gradients loss.backward()\n3. Update weights optimizer.step()\n4. Reset gradients optimizer.zero_grad()",
      ],
    },
    {
      id: "q10",
      question:
        "<h3>Assume that you have one of many arbitrary 8 bit grayscale images img (NumPy array) that you want to globally normalize (=normalization on complete data set) to the range [0, 1]. Which of the following code snippets achieve this normalization?</h3>",
      options: [
        "(img - img.mean()) / img.std()",
        "(img - img.min()) / (img.max() - img.min())",
        "img * 0 + (1 * img)",
        "img / 255",
      ],
      correctOptions: ["img / 255"],
    },
    {
      id: "q11",
      question:
        "<h3>In a study, people are asked how often they went to the cinema during last year. Which type of data is this?</h3>",
      options: [
        "ordinal data",
        "continuous numerical data",
        "discrete numerical data",
        "categorical data",
      ],
      correctOptions: ["discrete numerical data"],
    },
    {
      id: "q12",
      question:
        "<h3>Which of the following statements are correct regarding full-batch learning?</h3>",
      options: [
        "The batch size is a hyperparameter.",
        "It leads to smooth gradients.",
        "All training samples are used for one update.",
        "It is the fastest among the three main learning procedures (full-batch, online, minibatch).",
      ],
      correctOptions: [
        "All training samples are used for one update.",
        "It leads to smooth gradients.",
      ],
    },
    {
      id: "q13",
      question:
        "<h3>Which of the following statements are correct regarding training, validation and test sets?</h3>",
      options: [
        "Training, validation and test sets enable the detection of overfitting.",
        "Training, validation and test sets enable good estimates of the model generalization performance.",
        "Training, validation and test sets enable Empirical Risk Minimization (ERM).",
        "Training, validation and test sets enable the detection of underfitting.",
      ],
      correctOptions: [
        "Training, validation and test sets enable good estimates of the model generalization performance.",
        "Training, validation and test sets enable the detection of underfitting.",
        "Training, validation and test sets enable the detection of overfitting.",
      ],
    },
    {
      id: "q14",
      question:
        "<h3>Assume that MyModule is a class properly derived from the torch.nn.Module class and tensor_a and tensor_b are PyTorch tensors. What does the following code do?</h3><pre>my_module = MyModule()\nmy_module(tensor_a, tensor_b)</pre>",
      options: [
        "It creates an instance of MyModule. Then it applies the forward method of my_module with arguments tensor_a and tensor_b.",
        "It raises an exception, since only a single argument can be provided when calling my_module.",
        "It raises an exception, since one cannot create instances of MyModule.",
        "It creates an instance of MyModule. Then it applies the forward method of my_module with argument tensor_b. tensor_a is ignored.",
      ],
      correctOptions: [
        "It creates an instance of MyModule. Then it applies the forward method of my_module with arguments tensor_a and tensor_b.",
      ],
    },
    {
      id: "q15",
      question:
        "<h3>What does independently and identically distributed (i.i.d.) mean?</h3>",
      options: [
        "Each sample has the same probability distribution as the others and all are mutually dependent.",
        "Each sample has the same probability distribution as the others and all are mutually independent.",
        "Each sample has a different probability distribution as the others and all are mutually independent.",
        "Each sample has a different probability distribution as the others and all are mutually dependent.",
      ],
      correctOptions: [
        "Each sample has the same probability distribution as the others and all are mutually independent.",
      ],
    },
    {
      id: "q16",
      question:
        "<h3>Which of the following statements are correct regarding the following hash function:</h3><pre>def my_hash(x):\n    return int(x)</pre>",
      options: [
        "The hash function will work on any input.",
        "There cannot be any hash collisions.",
        "Different inputs could lead to the same hash value.",
        "The computation of the hash value is fast.",
      ],
      correctOptions: [
        "The computation of the hash value is fast.",
        "Different inputs could lead to the same hash value.",
      ],
    },
    {
      id: "q17",
      question: "<h3>What is the purpose of a loss function?</h3>",
      options: [
        "To compute the difference between the model output and the actual targets (ground truth).",
        "To change the model parameters.",
        "To compute the gradients for gradient-based iterative methods.",
        "To get the predictions of a model.",
      ],
      correctOptions: [
        "To compute the difference between the model output and the actual targets (ground truth).",
      ],
    },
    {
      id: "q18",
      question: "<h3>What is git?</h3>",
      options: [
        "A neural network architecture.",
        "A Python package for numerical computations.",
        "A platform to host programming projects.",
        "A version control system (VCS).",
      ],
      correctOptions: ["A version control system (VCS)."],
    },
    {
      id: "q19",
      question:
        "<h3>Which of the following are common loss functions for classification tasks?</h3>",
      options: [
        "Mean-squared error",
        "Cross entropy",
        "Sigmoid",
        "Stochastic gradient descent",
      ],
      correctOptions: ["Cross entropy"],
    },
    {
      id: "q20",
      question:
        '<h3>Why is the following code problematic (you can assume correct inputs, shapes and arguments)?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv = torch.nn.Conv2d(...)\n\n    def forward(self, x):\n        out1 = self.conv(x)\n        ...  # process "out1" so it can be an input to "linear"\n        linear = torch.nn.Linear(...)\n        out2 = linear(out1)\n        return out2</pre>',
      options: [
        "The submodule torch.nn.Linear is created inside the forward method rather than the __init__ method. This means that the submodule is repeatedly created in every forward call, including its random parameter initialization.",
        "torch.nn.Linear must be invoked before passing the data to the convolutional layer.",
        "torch.nn.Linear is assigned to a local identifier but torch.nn.Conv2d is not. Both should be defined to locals or the code will suffer from reproducibility.",
        "torch.nn.Conv2d can never be combined with torch.nn.Linear.",
      ],
      correctOptions: [
        "The submodule torch.nn.Linear is created inside the forward method rather than the __init__ method. This means that the submodule is repeatedly created in every forward call, including its random parameter initialization.",
      ],
    },
    {
      id: "q21",
      question:
        "<h3>The special method __getitem__ in a torch.utils.data.Dataset derived class should...</h3>",
      options: [
        "... return minibatched samples.",
        "... return all samples.",
        "... return one sample.",
        "... return the data set.",
      ],
      correctOptions: ["... return one sample."],
    },
    {
      id: "q22",
      question:
        "<h3>Consider the following Dataset implementation:</h3><pre>import numpy as np\nfrom torch.utils.data import Dataset\n\nclass MyDataset(Dataset):\n    def __getitem__(self, index):\n        rng = np.random.default_rng(seed=index)\n        return index, rng.random()</pre><p>Which of the following statements are correct?</p>",
      options: [
        "The implementation does not work because the mandatory __len__ method is missing.",
        "An instance of this class would produce infinitely many samples.",
        "A sample returned by the __getitem__ method always contains the index and a randomly generated number.",
        "In a multi-processed data loading setting, the returned samples might not be reproducible.",
      ],
      correctOptions: [
        "An instance of this class would produce infinitely many samples.",
        "A sample returned by the __getitem__ method always contains the index and a randomly generated number.",
      ],
    },
    {
      id: "q23",
      question:
        "<h3>What is the output of the following code?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self, a):\n        self.a = a\n\n    def forward(self, x):\n        output = x + self.a\n        return output\n\nmy_module = MyModule(2.0)\nc = my_module(5.0)\nprint(c)</pre>",
      options: [
        "It raises an exception because the forward method is not called.",
        "It raises an exception because super().__init__() is missing in the __init__ method.",
        "It raises an exception at self.a = a because only PyTorch trainable parameters and (sub)modules can be used as attributes.",
        "7.0",
      ],
      correctOptions: [
        "It raises an exception because super().__init__() is missing in the __init__ method.",
      ],
    },
    {
      id: "q24",
      question:
        "<h3>Which of the following statements are true regarding data augmentation?</h3>",
      options: [
        "Modifications in data augmentation can often be applied on-the-fly.",
        "Data augmentation can have a negative impact on the model performance.",
        "Modifications in data augmentation heavily depend on the data and task.",
        'Data augmentation is about creating "new" artificial samples by modifying existing samples.',
      ],
      correctOptions: [
        'Data augmentation is about creating "new" artificial samples by modifying existing samples.',
        "Modifications in data augmentation can often be applied on-the-fly.",
        "Data augmentation can have a negative impact on the model performance.",
        "Modifications in data augmentation heavily depend on the data and task.",
      ],
    },
    {
      id: "q25",
      question:
        '<h3>What is the output of the following code?</h3><pre>import torch\n\ndef function(x: torch.Tensor):\n    return x if x.min() < 0 else x * -1\n\nscripted_function = torch.jit.script(function)\ntraced_function = torch.jit.trace(function, example_inputs=torch.tensor([1, 2, 3]))\n\nactual_input = torch.tensor([-4, -5, -6])\nprint("s:", scripted_function(actual_input).tolist())\nprint("t:", traced_function(actual_input).tolist())</pre>',
      options: [
        "s: [-4, -5, -6]\nt: [-1, -2, -3]",
        "s: [4, 5, 6]\nt: [4, 5, 6]",
        "s: [4, 5, 6]\nt: [1, 2, 3]",
        "s: [4, 5, 6]\nt: [-1, -2, -3]",
        "s: [-4, -5, -6]\nt: [1, 2, 3]",
        "s: [-4, -5, -6]\nt: [4, 5, 6]",
        "s: [-4, -5, -6]\nt: [-4, -5, -6]",
        "s: [4, 5, 6]\nt: [-4, -5, -6]",
      ],
      correctOptions: ["s: [-4, -5, -6]\nt: [4, 5, 6]"],
    },
    {
      id: "q26",
      question:
        '<h3>Assume that you have a classification task where you want to classify images into either "dog" or "cat". Each image only contains a single dog or a single cat on some arbitrary background. Which of the following data augmentation techniques are useful?</h3>',
      options: [
        "Applying input dropout",
        "Zooming into the background",
        "Adding slight noise",
        "Flipping horizontally",
      ],
      correctOptions: [
        "Flipping horizontally",
        "Applying input dropout",
        "Adding slight noise",
      ],
    },
    {
      id: "q27",
      question: "<h3>Ordinal data can be described as:</h3>",
      options: [
        "Quantitative data with mathematical meaning but without a natural ordering.",
        "Qualitative data without mathematical meaning.",
        "Qualitative data without mathematical meaning but with a natural ordering.",
        "Quantitative data with mathematical meaning and a natural ordering.",
      ],
      correctOptions: [
        "Qualitative data without mathematical meaning but with a natural ordering.",
      ],
    },
    {
      id: "q28",
      question:
        "<h3>Assume you have the following categorical data in exactly this fixed order:</h3><p>computer, system, software, hardware</p><p>You are asked to create a one-hot encoding. Which of the following is the correct one-hot encoded representation of hardware?</p>",
      options: [
        "(1, 0, 0, 0)",
        "(0, 0, 0, 0)",
        "(1, 1, 1, 1)",
        "(1, 1, 1, 0)",
        "(0, 1, 1, 1)",
        "(0, 0, 0, 1)",
      ],
      correctOptions: ["(0, 0, 0, 1)"],
    },
    {
      id: "q29",
      question:
        "<h3>Which of the following statements are correct regarding monitoring a model during training?</h3>",
      options: [
        "Monitoring might aid in determining over- or underfitting.",
        "Monitoring might decrease the model performance.",
        "Monitoring might help in finding issues during training.",
        "Monitoring might increase the model performance.",
      ],
      correctOptions: [
        "Monitoring might help in finding issues during training.",
        "Monitoring might aid in determining over- or underfitting.",
      ],
    },
    {
      id: "q30",
      question: "<h3>torch.utils.data.Subset can be used to...</h3>",
      options: [
        "... generate a Dataset from a subset of the original Dataset according to a list of indices.",
        "... find a good subset of the input features, e.g., for dimensionality reduction.",
        "... distribute the sampling process over multiple sub-processes.",
        "... derive a custom class that creates minibatches from samples.",
      ],
      correctOptions: [
        "... generate a Dataset from a subset of the original Dataset according to a list of indices.",
      ],
    },
    {
      id: "q31",
      question:
        "<h3>In a supervised setting, how can one determine the performance of some machine learning model?</h3>",
      options: [
        "By averaging the gradients of the model and comparing it to a specified threshold.",
        "By comparing the model input and the model prediction with each other.",
        "By using a loss function to compute the deviation between the model prediction and the true target.",
        "By running a performance profiler on the model.",
      ],
      correctOptions: [
        "By using a loss function to compute the deviation between the model prediction and the true target.",
      ],
    },
    {
      id: "q32",
      question:
        "<h3>What is the shape of the output tensor result when running the following code?</h3><pre>import torch\n\nclass MyModule(torch.nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.linear = torch.nn.Linear(in_features=4, out_features=6)\n\n    def forward(self, x):\n        out = self.linear(x)\n        return torch.sigmoid(out)\n\ninp = torch.rand(size=(12, 4))\nmy_module = MyModule()\nresult = my_module(inp)</pre>",
      options: [
        "(12, 4)",
        "(4, 6)",
        "(12,)",
        "(12, 6)",
        "(4,)",
        "(12, 4, 6)",
        "(6,)",
      ],
      correctOptions: ["(12, 6)"],
    },
    {
      id: "q33",
      question:
        "<h3>Which statements regarding PyTorch's torch.nn.Module are correct?</h3>",
      options: [
        "It can contain and utilize other modules.",
        "It supports the automatic registration of trainable parameters.",
        "It is the base class for all neural network modules.",
        "All custom networks/layers/modules should be derived from this class.",
      ],
      correctOptions: [
        "It is the base class for all neural network modules.",
        "All custom networks/layers/modules should be derived from this class.",
        "It supports the automatic registration of trainable parameters.",
        "It can contain and utilize other modules.",
      ],
    },
    {
      id: "q34",
      question:
        "<h3>The forward method of a class derived from torch.nn.Module...</h3>",
      options: [
        "... pushes a PyTorch module to a given device.",
        "... adds a new forward layer to the network architecture of a module.",
        "... sets up the module architecture.",
        '... specifies how a PyTorch module is applied (the "flow" through the module architecture).',
      ],
      correctOptions: [
        '... specifies how a PyTorch module is applied (the "flow" through the module architecture).',
      ],
    },
    {
      id: "q35",
      question:
        '<h3>What is the output of the following code?</h3><pre>import torch\nfrom torch.utils.data import Dataset, DataLoader\n\nclass MyDataset(Dataset):\n    def __getitem__(self, index):\n        return torch.tensor([1, 2, 3, 4])\n\n    def __len__(self):\n        return 12\n\ndataset = MyDataset()\nloader = DataLoader(dataset, batch_size=4)\n\nfor i, x in enumerate(loader):\n    print(f"{i}: {tuple(x.shape)}")</pre>',
      options: [
        "0: (36,)",
        "0: (12, 4, 4)",
        "0: (4, 4)\n1: (4, 4)\n2: (4, 4)",
        "0: (4, 12, 4)",
        "0: (4,)\n1: (4,)\n2: (4,)",
        "0: (12, 4)\n1: (12, 4)",
      ],
      correctOptions: ["0: (4, 4)\n1: (4, 4)\n2: (4, 4)"],
    },
    {
      id: "q36",
      question:
        "<h3>What does collate_fn (collate function) do in terms of torch.utils.data.DataLoader?</h3>",
      options: [
        "It specifies the size of the subsets of the dataset.",
        "It specifies how a sample is loaded from the disk.",
        "It applies data augmentation methods to the samples.",
        "It specifies how the samples are combined into minibatches.",
      ],
      correctOptions: [
        "It specifies how the samples are combined into minibatches.",
      ],
    },
    {
      id: "q37",
      question:
        "<h3>If you start a new machine learning project, which of the following is one of the first steps that you should take?</h3>",
      options: [
        "Renting cloud-based hardware.",
        "Implementing the code for training and testing a neural network model.",
        "Creating training, evaluation and test datasets.",
        "Looking into the current state of research.",
      ],
      correctOptions: ["Looking into the current state of research."],
    },
    {
      id: "q38",
      question: "<h3>Training a neural network for one epoch will...</h3>",
      options: [
        "... perform training for a fixed number of seconds.",
        "... perform training until the model overfits on all training samples.",
        "... perform one training iteration over all training samples.",
        "... perform one weight update.",
      ],
      correctOptions: [
        "... perform one training iteration over all training samples.",
      ],
    },
    {
      id: "q39",
      question: "<h3>What is a hash collision?</h3>",
      options: [
        "Different inputs result in the same hash code.",
        "Equal inputs result in the same hash code.",
        "Different inputs result in different hash codes.",
        "Equal inputs result in different hash codes.",
      ],
      correctOptions: ["Different inputs result in the same hash code."],
    },
    {
      id: "q40",
      question:
        "<h3>Assume you have the following binary confusion matrix:</h3><pre>                      Predicted\n                 positive   negative\n------------------------------------\nActual positive |    0         60  |\n       negative |    0         40  |\n------------------------------------</pre><p>Which of the following statements are correct?</p>",
      options: [
        "The total number of samples is 100.",
        "The accuracy is 40%.",
        "The model is more likely to predict the negative class.",
        "The model did not make any mistakes with respect to the actual positive samples.",
      ],
      correctOptions: [
        "The accuracy is 40%.",
        "The total number of samples is 100.",
        "The model is more likely to predict the negative class.",
      ],
    },
    {
      id: "q41",
      question:
        "<h3>Assume you apply the following PyTorch image transformation to some example RGB image:</h3><pre>transforms.Compose([\n    transforms.RandomHorizontalFlip(0.5),\n    transforms.RandomVerticalFlip(0.5),\n    transforms.RandomRotation(degrees=180),\n    transforms.ToTensor()\n])</pre><p>Which of the following statements are correct?</p>",
      options: [
        "The resulting image might not be flipped (neither horizontally nor vertically) or rotated at all.",
        "The resulting image will be rotated by 180 degrees.",
        "The resulting image will be vertically flipped.",
        "The resulting image will be horizontally flipped.",
        "The resulting image will be a PyTorch tensor.",
      ],
      correctOptions: [
        "The resulting image will be a PyTorch tensor.",
        "The resulting image might not be flipped (neither horizontally nor vertically) or rotated at all.",
      ],
    },
  ],
};
