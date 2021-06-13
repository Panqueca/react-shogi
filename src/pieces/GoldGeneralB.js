const React = require("react");
const piecePositionHoc = require("../piecePositionHoc");

function GoldGeneralB(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42.078"
      height="50"
      transform="rotate(180)"
    >
      <path
        d="M20.942 0.777l13.51 3.76 6.878 45.133 -40.296 -0.48 6.358 -44.815z"
        fill="#FEEC99"
      />
      <path
        d="M0.111 49.402c0 -1.944 6.776 -45.495 7.11 -45.701 0.225 -0.139 3.425 -1.028 7.113 -1.976l6.705 -1.725 6.705 1.725c3.688 0.948 6.888 1.837 7.112 1.976 0.335 0.206 7.11 43.757 7.11 45.7 0 0.493 -3.707 0.599 -20.927 0.599 -17.22 0 -20.928 -0.106 -20.928 -0.598zm40.26 -1.517c-0.096 -0.429 -1.582 -10.281 -3.3 -21.895 -1.719 -11.614 -3.174 -21.153 -3.233 -21.199 -0.06 -0.045 -2.964 -0.84 -6.454 -1.767l-6.345 -1.683 -6.345 1.683c-3.49 0.927 -6.394 1.721 -6.453 1.766 -0.059 0.045 -1.511 9.484 -3.227 20.976 -1.716 11.492 -3.225 21.345 -3.352 21.896l-0.232 1.002 19.559 0c18.397 0 19.548 -0.046 19.382 -0.779zm-12.576 -2.99c-0.89 -0.944 -2.067 -1.656 -3.036 -1.838 -2.208 -0.414 -1.028 -1.056 1.957 -1.065 2.253 -0.007 2.338 -0.051 2.332 -1.231 -0.013 -2.655 -0.417 -3.229 -2.272 -3.229 -1.95 0 -1.997 0.069 -1.043 1.524 0.619 0.946 0.618 1.116 -0.015 1.748 -0.879 0.88 -3.381 1.371 -4.752 0.934 -0.97 -0.31 -0.916 -0.385 0.819 -1.123 1.541 -0.656 1.816 -0.955 1.61 -1.747 -0.196 -0.747 -0.481 -0.899 -1.304 -0.692 -3.356 0.842 -4.949 0.803 -5.897 -0.145 -0.519 -0.52 -1.044 -0.944 -1.166 -0.944 -0.123 0 -0.226 1.453 -0.23 3.228 -0.006 3.159 -0.603 5.219 -1.609 5.55 -0.527 0.174 -3.08 -3.785 -2.691 -4.173 0.123 -0.124 0.659 0.009 1.19 0.293 0.532 0.285 1.022 0.451 1.09 0.37 0.066 -0.08 0.246 -1.395 0.398 -2.92l0.277 -2.771 -1.55 0.74c-1.092 0.52 -1.55 1.035 -1.55 1.74 0 1.776 -0.814 3.286 -1.77 3.286 -1.046 0 -1.138 -0.91 -0.293 -2.892 0.515 -1.21 0.482 -1.377 -0.354 -1.792 -0.508 -0.252 -0.99 -0.932 -1.074 -1.512 -0.124 -0.87 -0.008 -0.995 0.668 -0.717 0.45 0.184 1.184 0.44 1.63 0.568 1.117 0.32 4.31 -0.79 4.31 -1.497 0 -0.433 -0.323 -0.391 -1.297 0.168 -1.12 0.642 -1.449 0.661 -2.425 0.139 -1.72 -0.92 -1.854 -1.815 -0.272 -1.815 1.103 0 1.322 -0.18 1.322 -1.082 0 -0.594 -0.325 -1.405 -0.721 -1.802 -0.92 -0.92 -0.531 -1.31 0.936 -0.943 0.816 0.205 1.224 0.67 1.412 1.612 0.146 0.728 0.54 1.324 0.877 1.324 0.92 0 0.748 -2.136 -0.278 -3.44 -0.49 -0.623 -0.89 -1.306 -0.89 -1.518 0 -0.648 1.966 -0.428 3.068 0.344 1.099 0.77 1.117 1.292 0.242 6.694l-0.301 1.857 2.1 0.315c3.143 0.471 11.354 -0.434 10.617 -1.17 -0.203 -0.204 -1.215 -0.156 -2.25 0.106 -1.98 0.503 -5.212 0.16 -4.798 -0.509 0.133 -0.216 1.391 -0.63 2.795 -0.919 2.82 -0.58 5.001 -1.548 5.001 -2.216 0 -0.58 -0.071 -0.569 -2.645 0.446 -1.228 0.484 -2.524 0.769 -2.88 0.632 -0.356 -0.137 -1.265 0.209 -2.02 0.767 -1.23 0.909 -1.444 0.944 -2.05 0.337 -0.625 -0.624 -0.496 -2.168 0.181 -2.173 0.158 -0.002 0.888 -0.49 1.622 -1.085l1.336 -1.083 -1.558 -1.346 -1.559 -1.346 2.352 -0.018c1.294 -0.01 3.078 -0.321 3.965 -0.692 1.45 -0.606 1.721 -0.603 2.685 0.028 1.584 1.038 1.03 1.713 -1.758 2.137 -2.203 0.336 -2.507 0.51 -2.708 1.559 -0.306 1.592 -0.108 1.686 1.719 0.815 1.953 -0.932 3.28 -0.948 4.555 -0.055 1.25 0.875 1.254 1.698 0.015 2.852 -0.82 0.764 -0.855 0.908 -0.222 0.908 0.413 0 0.752 0.226 0.752 0.503 0 0.332 0.674 0.427 1.985 0.28 2.116 -0.24 3.803 0.511 3.803 1.69 0 0.48 -0.603 0.643 -2.382 0.643l-2.382 0 0.212 3.307c0.117 1.82 0.083 3.823 -0.075 4.453 -0.415 1.652 -1.98 1.487 -3.756 -0.396zm-11.988 -20.326c-0.954 -0.982 -0.65 -1.149 2.656 -1.456 2.393 -0.222 3.471 -0.542 4.23 -1.255 1.278 -1.2 1.346 -2.582 0.127 -2.582 -0.695 0 -0.89 0.297 -0.89 1.35 0 0.794 -0.278 1.456 -0.674 1.609 -0.867 0.332 -2.11 -0.69 -1.804 -1.486 0.129 -0.335 -0.574 0.04 -1.563 0.834 -1.447 1.163 -1.943 1.348 -2.551 0.953 -0.996 -0.647 -0.823 -2.722 0.323 -3.868 0.751 -0.751 1.06 -0.809 2.014 -0.374 1.105 0.503 2.473 0.319 2.473 -0.333 0 -0.182 -0.851 -0.689 -1.892 -1.127l-1.892 -0.797 1.892 -0.447c2.163 -0.512 2.46 -1.087 0.668 -1.293 -0.73 -0.084 -1.225 -0.411 -1.225 -0.809 0 -0.853 6.23 -1.74 6.977 -0.994 0.726 0.726 0.015 1.44 -1.437 1.44 -0.72 0 -1.31 0.225 -1.31 0.5 0 0.314 0.476 0.406 1.271 0.247 1.52 -0.304 2.52 0.445 1.781 1.334 -0.269 0.325 -0.954 0.59 -1.521 0.59 -0.568 0 -1.157 0.2 -1.308 0.445 -0.163 0.264 0.356 0.445 1.278 0.445 1.392 0 2.957 0.903 2.95 1.702 -0.002 0.166 -0.29 0.853 -0.642 1.527 -0.583 1.117 -0.57 1.224 0.156 1.224 0.721 0 2.27 1.277 2.27 1.872 0 0.133 -1.654 0.361 -3.674 0.505 -2.02 0.145 -4.676 0.388 -5.9 0.54 -1.544 0.191 -2.397 0.1 -2.783 -0.296zm1.712 -4.676c0.517 -0.622 0.484 -0.697 -0.242 -0.557 -0.462 0.09 -0.923 0.414 -1.025 0.72 -0.264 0.794 0.561 0.688 1.267 -0.163zm-4.654 -5.626c4.6 -4.744 6.66 -7.714 5.946 -8.574 -0.635 -0.764 -0.218 -1.556 0.82 -1.556 1.176 0 2.81 1.334 2.643 2.158 -0.103 0.508 1.029 1.507 3.65 3.22 4.667 3.053 6.812 5.025 6.61 6.077 -0.318 1.648 -2.116 0.795 -6.546 -3.106 -2.433 -2.143 -4.558 -3.896 -4.722 -3.896 -0.163 0 -1.817 1.617 -3.676 3.593 -2.86 3.04 -6.622 5.758 -7.97 5.758 -0.174 0 1.287 -1.653 3.245 -3.674z"
        fill="#cfcfcf"
      />
      <path
        d="M0.109 49.666c-0.004 -0.545 6.76 -45.742 6.862 -45.851 0.051 -0.055 3.237 -0.933 7.08 -1.952l6.988 -1.852 6.987 1.852c3.844 1.019 7.03 1.897 7.081 1.952 0.102 0.109 6.866 45.306 6.862 45.851 -0.001 0.184 -9.42 0.334 -20.93 0.334 -11.51 0 -20.929 -0.15 -20.93 -0.334zm40.314 -2.004c-0.124 -0.55 -1.535 -9.918 -3.136 -20.816 -1.601 -10.898 -3.017 -20.34 -3.146 -20.983 -0.22 -1.088 -0.652 -1.279 -6.335 -2.79 -3.354 -0.893 -6.4 -1.624 -6.767 -1.624 -0.367 0 -3.413 0.73 -6.767 1.623 -5.682 1.512 -6.116 1.703 -6.335 2.791 -0.13 0.643 -1.544 9.985 -3.144 20.76 -1.6 10.776 -3.023 20.143 -3.163 20.817l-0.254 1.224 19.636 0 19.636 0 -0.225 -1.002zm-12.235 -2.525c-0.518 -0.728 -1.756 -1.594 -2.813 -1.968 -2.008 -0.711 -1.873 -0.776 1.898 -0.907 1.37 -0.048 1.576 -0.209 1.704 -1.332 0.08 -0.704 0.027 -1.755 -0.12 -2.338 -0.238 -0.951 -0.504 -1.057 -2.595 -1.036 -2.247 0.022 -2.294 0.048 -1.327 0.722 1.99 1.389 0.974 3.171 -2.04 3.575 -2.275 0.306 -2.78 -0.531 -0.73 -1.208 1.33 -0.44 1.533 -0.673 1.285 -1.483 -0.41 -1.337 -0.254 -1.303 -3.255 -0.713 -2.848 0.56 -3.588 0.342 -4.48 -1.325 -0.332 -0.622 0.182 -0.706 4.366 -0.717 5.337 -0.013 8.44 -0.475 7.761 -1.155 -0.286 -0.286 -1.125 -0.264 -2.428 0.064 -1.309 0.33 -2.515 0.36 -3.517 0.09l-1.526 -0.41 2.004 -0.558c3.376 -0.938 5.766 -1.852 6.05 -2.313 0.531 -0.859 -0.234 -0.91 -2.225 -0.15 -1.11 0.424 -2.413 0.667 -2.896 0.54 -0.53 -0.138 -1.182 0.106 -1.64 0.613 -0.843 0.93 -2.624 1.125 -3.11 0.339 -0.18 -0.291 0.608 -1.362 1.866 -2.536 1.879 -1.753 2.055 -2.057 1.287 -2.216 -1.015 -0.21 -2.004 -0.92 -2.004 -1.439 0 -0.193 1.252 -0.47 2.783 -0.614 5.91 -0.557 5.9 -0.558 5.9 0.401 0 0.72 -0.405 0.943 -2.159 1.194 -2.494 0.357 -2.303 0.224 -2.7 1.875 -0.264 1.102 -0.195 1.246 0.494 1.021 4.047 -1.317 4.48 -1.363 5.656 -0.592 1.377 0.902 1.462 1.66 0.304 2.709 -0.842 0.762 -0.842 0.785 0.016 1.643 0.74 0.74 1.111 0.805 2.476 0.428 1.414 -0.39 3.26 -0.044 3.26 0.612 0 0.094 0.133 0.519 0.296 0.944 0.268 0.696 0.03 0.748 -2.404 0.528l-2.701 -0.245 0.4 1.398c0.58 2.02 0.495 6.698 -0.133 7.326 -0.893 0.892 -2.027 0.603 -3.003 -0.767zm-15.498 0.542c-0.306 -0.113 -0.556 -0.408 -0.556 -0.655 0 -0.247 -0.401 -0.959 -0.891 -1.582 -1.007 -1.28 -1.164 -2.11 -0.334 -1.77l1.276 0.518c0.598 0.24 0.77 -0.171 1.029 -2.453 0.17 -1.51 0.216 -2.837 0.102 -2.952 -0.115 -0.115 -0.829 0.112 -1.586 0.503 -0.966 0.5 -1.378 1.036 -1.378 1.793 0 1.652 -0.938 3.35 -1.852 3.35 -0.959 0 -1.03 -0.972 -0.21 -2.893 0.515 -1.21 0.482 -1.377 -0.354 -1.792 -0.508 -0.252 -0.986 -0.898 -1.064 -1.436 -0.13 -0.91 -0.045 -0.945 1.236 -0.498 1.627 0.567 4.165 0.182 5.124 -0.778 1.206 -1.206 0.73 -1.506 -0.882 -0.556 -1.468 0.866 -1.632 0.878 -2.671 0.197 -1.468 -0.961 -1.402 -1.595 0.166 -1.595 1.147 0 1.253 -0.123 1.056 -1.225 -0.121 -0.673 -0.525 -1.575 -0.898 -2.003 -0.618 -0.709 -0.598 -0.78 0.211 -0.78 1.052 0 2.365 1.318 2.365 2.373 0 1.169 1.208 0.87 1.442 -0.358 0.134 -0.699 -0.075 -1.36 -0.571 -1.81 -0.43 -0.389 -0.884 -1.095 -1.008 -1.57 -0.311 -1.19 1.608 -1.17 2.808 0.03 1 0.998 1.11 2.169 0.424 4.455 -0.257 0.856 -0.62 4.015 -0.806 7.02 -0.339 5.48 -0.84 6.964 -2.178 6.467zm3.117 -21.11c-0.948 -0.975 -0.628 -1.285 1.336 -1.296 2.74 -0.015 5.345 -0.713 5.999 -1.608 0.87 -1.19 0.709 -2.389 -0.322 -2.389 -0.695 0 -0.89 0.297 -0.89 1.35 0 1.625 -1.09 2.205 -2.15 1.144 -0.654 -0.654 -0.664 -0.796 -0.077 -1.167 0.367 -0.232 0.445 -0.425 0.173 -0.43 -0.273 -0.003 -1.246 0.59 -2.164 1.32 -1.358 1.079 -1.83 1.238 -2.544 0.856 -0.523 -0.28 -0.773 -0.74 -0.62 -1.14 0.141 -0.368 0.257 -0.95 0.257 -1.29 0 -1.073 2.032 -2.114 3.055 -1.566 0.488 0.261 1.203 0.354 1.588 0.206 1.077 -0.413 0.838 -1.509 -0.328 -1.509 -0.565 0 -1.397 -0.27 -1.848 -0.6 -0.748 -0.547 -0.657 -0.627 1.028 -0.896 1.842 -0.294 2.601 -1.175 1.012 -1.175 -0.46 0 -1.083 -0.299 -1.386 -0.663 -0.736 -0.887 -0.164 -1.072 3.78 -1.222 2.527 -0.097 3.118 0.007 3.118 0.549 0 0.428 -0.52 0.718 -1.447 0.807 -0.796 0.077 -1.448 0.352 -1.448 0.612 0 0.29 0.526 0.368 1.353 0.203 1 -0.2 1.424 -0.087 1.624 0.434 0.317 0.826 -0.557 1.49 -1.975 1.499 -0.55 0.004 -1.002 0.207 -1.002 0.452 0 0.245 0.515 0.445 1.143 0.445 2.5 0 3.515 1.516 2.404 3.592 -0.38 0.71 -0.314 0.861 0.376 0.861 0.46 0 1.196 0.397 1.635 0.881 0.991 1.096 0.743 1.195 -3.776 1.52 -1.837 0.13 -4.242 0.363 -5.344 0.515 -1.364 0.188 -2.18 0.094 -2.56 -0.296zm2.018 -4.778c0.128 -0.384 -0.086 -0.544 -0.594 -0.446 -0.436 0.085 -0.883 0.424 -0.993 0.753 -0.128 0.383 0.086 0.544 0.594 0.445 0.437 -0.084 0.883 -0.423 0.993 -0.752zm-4.758 -5.702c4.79 -4.93 6.526 -7.453 5.764 -8.37 -0.652 -0.787 -0.25 -1.582 0.8 -1.582 1.207 0 2.8 1.335 2.654 2.225 -0.097 0.587 0.962 1.533 3.875 3.462 4.6 3.046 6.696 5.069 6.305 6.086 -0.469 1.222 -1.531 0.76 -4.813 -2.088 -1.763 -1.53 -3.95 -3.431 -4.861 -4.223l-1.655 -1.44 -2.513 2.862c-2.99 3.405 -5.347 5.34 -7.675 6.303 -1.605 0.663 -1.476 0.466 2.119 -3.235z"
        fill="#b0b0b0"
      />
      <path
        d="M0.227 48.776c0.125 -0.674 1.692 -11.076 3.483 -23.117l3.256 -21.891 7.036 -1.839 7.037 -1.839 7.037 1.84 7.036 1.838 3.256 21.891c1.791 12.04 3.358 22.443 3.483 23.117l0.227 1.224 -21.04 0 -21.038 0 0.227 -1.224zm40.386 0c-0.154 -2.902 -6.663 -43.918 -7.002 -44.126 -0.26 -0.16 -3.206 -0.985 -6.546 -1.833l-6.072 -1.544 -6.03 1.544c-3.316 0.848 -6.242 1.674 -6.502 1.835 -0.363 0.224 -6.915 41.332 -6.996 43.9 -0.014 0.438 4.188 0.557 19.574 0.557 10.775 0 19.584 -0.15 19.574 -0.333zm-12.72 -3.92c-0.787 -0.873 -2.032 -1.676 -2.893 -1.867 -1.39 -0.309 -1.298 -0.354 1.16 -0.559 2.55 -0.212 2.678 -0.28 2.817 -1.5 0.08 -0.704 0.027 -1.755 -0.12 -2.338 -0.241 -0.964 -0.497 -1.058 -2.817 -1.048l-2.552 0.012 1.224 0.76c0.674 0.417 1.225 1.123 1.225 1.569 0 1.082 -2.845 2.274 -4.405 1.846 -1.154 -0.316 -1.15 -0.322 0.509 -0.983 1.702 -0.678 1.968 -1.164 1.254 -2.293 -0.34 -0.536 -0.788 -0.549 -2.866 -0.084 -2.73 0.611 -3.896 0.28 -4.771 -1.354 -0.472 -0.882 -0.423 -0.92 0.769 -0.599 1.975 0.531 10.118 0.058 11.271 -0.654 0.86 -0.531 0.126 -1.432 -0.786 -0.967 -1.317 0.672 -3.375 0.898 -4.983 0.548l-1.558 -0.339 1.781 -0.512c0.98 -0.282 2.61 -0.717 3.622 -0.967 1.788 -0.44 3.227 -1.54 2.702 -2.064 -0.142 -0.142 -1.167 0.088 -2.276 0.512 -1.11 0.424 -2.413 0.667 -2.896 0.54 -0.53 -0.138 -1.182 0.106 -1.64 0.613 -0.96 1.06 -2.851 1.13 -2.851 0.106 0 -0.405 0.851 -1.543 1.892 -2.529 1.666 -1.578 1.786 -1.815 1.002 -1.983 -1.069 -0.229 -2.004 -0.936 -2.004 -1.515 0 -0.232 0.378 -0.301 0.84 -0.155 0.461 0.147 1.713 0.037 2.782 -0.244 1.07 -0.281 2.645 -0.538 3.502 -0.57 1.282 -0.05 1.559 0.098 1.559 0.83 0 0.666 -0.338 0.922 -1.336 1.013 -2.544 0.233 -3.34 0.556 -3.34 1.356 0 0.436 -0.24 1.034 -0.534 1.327 -0.813 0.814 1.066 0.692 2.912 -0.189 1.709 -0.815 3.669 -0.44 4.486 0.855 0.365 0.579 0.258 0.96 -0.475 1.693 -0.93 0.93 -0.931 0.961 -0.1 1.792 0.67 0.67 1.215 0.786 2.633 0.56 1.376 -0.22 1.99 -0.103 2.667 0.51 1.491 1.349 1.063 1.694 -1.743 1.4l-2.622 -0.274 0.385 1.658c0.53 2.28 0.502 5.769 -0.055 6.808 -0.673 1.258 -1.803 1.017 -3.37 -0.72zm-15.76 0.203c0 -0.268 -0.422 -1.08 -0.939 -1.806 -1.133 -1.592 -0.869 -2.043 0.625 -1.065l1.098 0.72 0.315 -2.945c0.174 -1.62 0.217 -3.045 0.095 -3.166 -0.12 -0.122 -0.84 0.1 -1.597 0.491 -1.053 0.545 -1.378 1.013 -1.378 1.988 0 1.724 -1.503 3.588 -2.279 2.825 -0.451 -0.444 -0.414 -0.862 0.191 -2.13 0.915 -1.92 0.92 -1.993 0.1 -1.993 -0.566 0 -1.574 -1.259 -1.574 -1.966 0 -0.134 0.858 -0.126 1.906 0.018 2.247 0.308 5.219 -0.74 5.219 -1.84 0 -0.65 -0.09 -0.652 -0.99 -0.022 -1.178 0.825 -3.074 0.904 -3.82 0.159 -0.868 -0.869 -0.616 -1.29 0.69 -1.153 1.12 0.117 1.212 0.014 1.073 -1.207 -0.084 -0.735 -0.466 -1.687 -0.848 -2.115 -0.58 -0.65 -0.59 -0.78 -0.058 -0.78 1.166 0 2.617 1.365 2.617 2.46 0 0.739 0.195 1 0.624 0.835 1.07 -0.41 1.205 -2.073 0.25 -3.089 -1.886 -2.008 -0.311 -3.41 1.713 -1.524 1.133 1.055 1.179 1.902 0.298 5.548 -0.355 1.47 -0.648 4.316 -0.652 6.325 -0.008 4.017 -0.605 5.92 -1.86 5.92 -0.45 0 -0.818 -0.22 -0.818 -0.488zm3.776 -20.733c-0.798 -0.796 -0.72 -0.829 2.711 -1.139 2.834 -0.256 3.686 -0.508 4.311 -1.274 0.939 -1.149 1.011 -2.452 0.155 -2.78 -0.86 -0.33 -1.157 0.072 -1.157 1.567 0 1.553 -1.113 2.107 -2.15 1.07 -0.645 -0.646 -0.657 -0.798 -0.089 -1.15 0.36 -0.222 0.532 -0.528 0.38 -0.679 -0.15 -0.15 -0.972 0.34 -1.826 1.09 -2.07 1.817 -3.439 1.828 -3.439 0.027 0 -0.74 0.395 -1.731 0.884 -2.22 0.737 -0.738 1.065 -0.802 1.975 -0.387 1.289 0.587 2.484 0.24 2.484 -0.719 0 -0.415 -0.401 -0.682 -1.028 -0.682 -0.565 0 -1.397 -0.27 -1.848 -0.6 -0.748 -0.547 -0.657 -0.627 1.028 -0.896 1.842 -0.294 2.601 -1.176 1.012 -1.176 -0.46 0 -1.071 -0.283 -1.359 -0.63 -0.415 -0.5 -0.357 -0.677 0.28 -0.854 1.81 -0.504 5.741 -0.722 6.314 -0.35 0.92 0.599 0.177 1.39 -1.308 1.39 -0.839 0 -1.31 0.228 -1.31 0.636 0 0.498 0.296 0.552 1.36 0.247 1.065 -0.306 1.416 -0.241 1.623 0.299 0.311 0.81 -0.573 1.472 -1.98 1.482 -0.552 0.004 -1.003 0.207 -1.003 0.452 0 0.245 0.515 0.445 1.143 0.445 2.739 0 3.803 2.18 1.963 4.02l-0.902 0.901 1.13 -0.284c1.189 -0.298 2.455 0.407 2.455 1.367 0 0.375 -1.251 0.645 -3.896 0.843 -2.143 0.16 -4.615 0.406 -5.494 0.547 -1.2 0.193 -1.802 0.052 -2.419 -0.563zm1.916 -4.535c0.128 -0.384 -0.086 -0.544 -0.594 -0.446 -0.436 0.085 -0.883 0.424 -0.993 0.753 -0.128 0.383 0.086 0.544 0.594 0.445 0.437 -0.084 0.883 -0.423 0.993 -0.752zm-4.917 -5.39c1.757 -1.703 3.944 -4.223 4.858 -5.6 1.424 -2.146 1.586 -2.63 1.122 -3.372 -0.44 -0.704 -0.419 -0.913 0.11 -1.116 1.086 -0.417 3.154 0.844 3.154 1.924 0 0.729 1.009 1.634 4.068 3.651 2.237 1.475 4.583 3.295 5.213 4.044 1.128 1.34 1.173 2.673 0.09 2.673 -0.304 0 -2.737 -1.901 -5.407 -4.225l-4.854 -4.224 -3.117 3.354c-3.105 3.341 -6.535 5.98 -7.778 5.983 -0.36 0.001 0.784 -1.39 2.541 -3.093z"
        fill="#909090"
      />
      <path
        d="M0.284 48.776c0.135 -0.674 1.678 -10.943 3.43 -22.82 1.752 -11.878 3.311 -21.737 3.466 -21.909 0.154 -0.172 3.335 -1.126 7.07 -2.121l6.789 -1.809 6.79 1.809c3.734 0.995 6.915 1.95 7.07 2.121 0.154 0.172 1.713 10.031 3.465 21.908 1.752 11.878 3.295 22.147 3.43 22.82l0.243 1.225 -20.998 0 -20.998 0 0.243 -1.224zm40.23 -1.114c-0.13 -0.796 -1.59 -10.664 -3.249 -21.93 -1.658 -11.264 -3.15 -20.64 -3.315 -20.833 -0.165 -0.193 -3.138 -1.115 -6.606 -2.048l-6.305 -1.696 -6.306 1.696c-3.468 0.933 -6.44 1.855 -6.603 2.048 -0.242 0.285 -6.714 42.732 -6.69 43.877 0.004 0.183 8.85 0.333 19.657 0.333l19.65 0 -0.234 -1.447zm-12.02 -2.397c-0.55 -0.645 -1.8 -1.542 -2.78 -1.994l-1.78 -0.821 2.56 -0.01 2.56 -0.01 -0.007 -2.115c-0.004 -1.163 -0.154 -2.338 -0.334 -2.61 -0.346 -0.524 -4.495 -0.183 -8.74 0.719 -1.78 0.378 -2.372 0.336 -3.228 -0.225 -1.492 -0.977 -1.425 -2.123 0.09 -1.547 0.746 0.284 2.63 0.272 5.455 -0.033 5.122 -0.553 5.985 -0.773 5.73 -1.462 -0.105 -0.285 -0.466 -0.438 -0.803 -0.339 -0.337 0.1 -1.892 0.275 -3.456 0.39 -3.563 0.263 -3.347 -0.466 0.355 -1.194 2.625 -0.517 5.018 -1.89 4.391 -2.519 -0.178 -0.178 -1.24 0.025 -2.361 0.453 -1.12 0.428 -2.442 0.672 -2.937 0.543 -0.547 -0.143 -1.237 0.1 -1.758 0.622 -0.471 0.471 -1.258 0.857 -1.748 0.857 -1.479 0 -1.04 -1.512 0.89 -3.063 1.929 -1.55 2.243 -2.28 0.98 -2.28 -0.44 0 -1.048 -0.246 -1.349 -0.548 -0.434 -0.433 0.082 -0.668 2.471 -1.124 1.66 -0.317 3.568 -0.694 4.239 -0.838 0.901 -0.193 1.295 -0.062 1.512 0.502 0.384 1.002 -0.534 1.548 -2.62 1.556 -1.46 0.006 -1.742 0.187 -2.264 1.454 -0.756 1.833 -0.202 2.047 2.563 0.991 1.683 -0.642 2.126 -0.662 3.188 -0.145 1.68 0.819 1.79 1.487 0.462 2.815 -0.788 0.788 -0.927 1.126 -0.464 1.126 0.364 0 0.78 0.309 0.925 0.687 0.208 0.541 0.68 0.624 2.23 0.392 1.54 -0.231 2.153 -0.126 2.829 0.485 1.342 1.215 0.606 1.676 -2.128 1.335 -2.27 -0.284 -2.433 -0.245 -2.127 0.512 0.596 1.473 0.78 6.134 0.293 7.386 -0.599 1.54 -1.556 1.558 -2.839 0.052zm-17.003 -1.54c-1.377 -2.08 -1.265 -2.58 0.343 -1.527l1.114 0.73 0.315 -2.94c0.173 -1.618 0.209 -3.047 0.08 -3.176 -0.13 -0.13 -0.829 0.07 -1.553 0.445 -1.01 0.523 -1.382 1.088 -1.596 2.424 -0.311 1.945 -1.379 3.171 -2.117 2.433 -0.312 -0.312 -0.23 -1.002 0.262 -2.178 0.471 -1.128 0.556 -1.776 0.245 -1.88 -0.664 -0.221 -1.794 -1.4 -1.794 -1.87 0 -0.216 0.966 -0.278 2.147 -0.138 2.392 0.283 4.978 -0.7 4.978 -1.892 0 -0.608 -0.106 -0.607 -0.99 0.012 -1.178 0.825 -3.074 0.904 -3.82 0.159 -0.847 -0.848 -0.629 -1.199 0.69 -1.108 1.113 0.076 1.211 -0.04 1.073 -1.252 -0.084 -0.735 -0.466 -1.687 -0.848 -2.115 -0.58 -0.65 -0.59 -0.78 -0.058 -0.78 1.183 0 2.617 1.364 2.617 2.49 0 0.966 0.111 1.044 0.89 0.627 1.14 -0.61 1.14 -1.978 0 -3.117 -1.979 -1.979 -0.537 -3.028 1.617 -1.176l1.22 1.05 -0.75 3.415c-0.413 1.879 -0.75 4.983 -0.75 6.899 0 3.732 -0.628 6.287 -1.544 6.287 -0.31 0 -1.107 -0.82 -1.77 -1.822zm9.606 -2.134c-0.448 -0.288 -0.17 -0.537 1.041 -0.937 1.288 -0.425 1.603 -0.73 1.431 -1.388 -0.302 -1.155 0.253 -1.383 1.405 -0.577 1.776 1.245 1.03 2.412 -1.931 3.02 -0.735 0.151 -1.61 0.098 -1.946 -0.118zm-5.092 -17.321c-0.77 -0.85 -0.72 -0.871 2.572 -1.083 3.828 -0.245 5.265 -1.098 5.043 -2.993 -0.195 -1.667 -1.688 -1.817 -1.697 -0.171 -0.01 1.925 -0.575 2.567 -1.718 1.955 -1.063 -0.568 -1.226 -1.192 -0.39 -1.49 0.306 -0.11 0.427 -0.339 0.269 -0.51 -0.158 -0.171 -0.986 0.302 -1.84 1.052 -1.968 1.728 -3.439 1.823 -3.439 0.22 0 -2.238 0.738 -2.916 3.016 -2.772 1.681 0.106 2.104 -0.017 2.233 -0.649 0.097 -0.471 -0.109 -0.779 -0.52 -0.779 -0.374 0 -1.234 -0.25 -1.912 -0.556l-1.232 -0.557 1.764 -0.223c1.177 -0.148 1.81 -0.47 1.905 -0.967 0.102 -0.536 -0.092 -0.683 -0.695 -0.525 -0.46 0.12 -1.082 -0.078 -1.383 -0.44 -0.457 -0.55 -0.341 -0.699 0.699 -0.898 3.806 -0.73 5.095 -0.787 5.735 -0.256 0.813 0.674 0.112 1.288 -1.484 1.298 -0.57 0.004 -1.002 0.282 -1.002 0.647 0 0.483 0.383 0.578 1.559 0.387 1.232 -0.2 1.558 -0.105 1.558 0.453 0 0.455 -0.555 0.81 -1.558 0.999 -0.934 0.175 -1.559 0.552 -1.559 0.94 0 0.43 0.28 0.56 0.832 0.385 0.458 -0.145 1.36 -0.064 2.004 0.181 1.474 0.56 1.545 2.017 0.17 3.481l-1.002 1.067 1.23 -0.309c1.29 -0.323 2.555 0.341 2.555 1.343 0 0.38 -1.286 0.64 -4.119 0.832 -2.265 0.154 -4.724 0.398 -5.464 0.542 -0.999 0.195 -1.549 0.039 -2.13 -0.604zm1.917 -4.564c0 -0.236 -0.4 -0.43 -0.89 -0.43 -0.6 0 -0.891 0.297 -0.891 0.907 0 0.768 0.136 0.833 0.89 0.43 0.49 -0.263 0.891 -0.67 0.891 -0.907zm-5.282 -4.997c4.807 -4.52 7.233 -8.18 6.227 -9.393 -0.819 -0.986 0.638 -1.304 2.223 -0.484 0.959 0.496 1.259 0.912 1.075 1.49 -0.2 0.63 0.54 1.32 3.39 3.173 4.929 3.202 6.616 4.743 6.616 6.043 0 0.594 -0.264 1.067 -0.596 1.067 -0.327 0 -2.78 -1.903 -5.45 -4.23l-4.854 -4.229 -3.567 3.726c-3.048 3.184 -6.39 5.634 -7.668 5.62 -0.193 -0.003 0.979 -1.255 2.604 -2.783z"
        fill="#6f6f6f"
      />
      <path
        d="M0.391 48.553c0.123 -0.796 1.673 -11.165 3.445 -23.043l3.22 -21.595 6.991 -1.863 6.992 -1.863 6.991 1.863 6.992 1.863 3.22 21.595c1.772 11.878 3.321 22.247 3.445 23.043l0.224 1.447 -20.872 0 -20.872 0 0.224 -1.447zm40.247 0.223c0.03 -1.332 -6.433 -43.61 -6.714 -43.919 -0.197 -0.216 -3.176 -1.151 -6.621 -2.078l-6.264 -1.685 -6.264 1.685c-3.445 0.927 -6.425 1.862 -6.624 2.078 -0.309 0.338 -6.733 42.16 -6.712 43.696 0.006 0.437 4.227 0.556 19.6 0.556 10.775 0 19.595 -0.15 19.6 -0.333zm-12.475 -3.896c-0.845 -0.872 -2.142 -1.762 -2.883 -1.977 -1.17 -0.34 -1.009 -0.398 1.236 -0.432l2.582 -0.04 -0.133 -2.56 -0.134 -2.561 -2.449 0.158c-1.347 0.087 -3.899 0.408 -5.671 0.714 -2.707 0.467 -3.366 0.455 -4.119 -0.072 -1.567 -1.098 -1.138 -1.852 0.773 -1.361 2.38 0.61 10.576 -0.507 10.576 -1.443 0 -0.377 -0.291 -0.59 -0.668 -0.488 -0.368 0.1 -1.97 0.25 -3.562 0.336 -3.227 0.174 -2.84 -0.214 1.368 -1.371 2.691 -0.74 4.943 -2.484 3.208 -2.484 -0.498 0 -1.662 0.316 -2.586 0.702 -0.924 0.386 -2.066 0.601 -2.536 0.478 -0.498 -0.13 -1.216 0.136 -1.714 0.634 -1.062 1.062 -2.638 1.134 -2.638 0.12 0 -0.404 0.801 -1.422 1.78 -2.26 0.98 -0.839 1.782 -1.666 1.782 -1.838 0 -0.172 -0.651 -0.584 -1.447 -0.915l-1.448 -0.602 2.56 -0.37c1.408 -0.203 2.98 -0.594 3.492 -0.869 1.149 -0.615 3.077 -0.19 3.077 0.678 0 0.595 -0.903 0.874 -4.008 1.238 -0.616 0.072 -1.06 0.383 -0.996 0.695 0.065 0.31 -0.086 0.944 -0.335 1.41 -0.645 1.205 0.144 1.52 1.741 0.694 1.367 -0.707 3.436 -0.89 4.674 -0.416 1.054 0.405 0.872 2.281 -0.28 2.898l-0.986 0.527 0.985 0.365c0.542 0.2 0.986 0.594 0.986 0.874 0 0.354 0.624 0.417 2.031 0.206 2.13 -0.32 3.312 0.181 3.312 1.403 0 0.525 -0.471 0.587 -2.52 0.33 -2.182 -0.272 -2.484 -0.22 -2.252 0.384 0.532 1.386 0.794 5.908 0.417 7.214 -0.533 1.853 -1.42 1.853 -3.215 0zm-16.083 -0.335c-0.292 -0.55 -0.84 -1.478 -1.218 -2.06l-0.687 -1.06 1.37 0.708 1.368 0.708 0.273 -1.652c0.15 -0.91 0.276 -2.388 0.278 -3.286l0.005 -1.632 -1.73 0.948c-0.952 0.521 -1.641 1.182 -1.531 1.47 0.266 0.694 -1.027 3.741 -1.588 3.741 -0.863 0 -0.958 -0.874 -0.272 -2.515 0.62 -1.485 0.622 -1.705 0.02 -2.042 -0.372 -0.208 -0.881 -0.762 -1.132 -1.23 -0.426 -0.797 -0.319 -0.835 1.696 -0.596 2.397 0.284 4.983 -0.697 4.983 -1.89 0 -0.59 -0.18 -0.576 -1.325 0.1 -1.011 0.598 -1.61 0.683 -2.524 0.36 -1.626 -0.575 -1.788 -1.355 -0.276 -1.333 1.108 0.017 1.215 -0.115 1.076 -1.317 -0.085 -0.735 -0.364 -1.591 -0.62 -1.904 -0.677 -0.825 -0.12 -1.143 0.975 -0.557 0.52 0.278 1.058 1.072 1.196 1.763 0.193 0.966 0.448 1.207 1.097 1.038 1.142 -0.3 1.114 -2.361 -0.045 -3.354 -1.057 -0.905 -1.172 -2.107 -0.202 -2.107 0.843 0 2.88 1.97 2.858 2.763 -0.009 0.317 -0.306 1.779 -0.66 3.248 -0.356 1.47 -0.65 4.175 -0.655 6.011 -0.016 5.598 -1.328 8.326 -2.73 5.677zm9.85 -3.643c1.157 -0.424 1.548 -0.821 1.52 -1.546 -0.046 -1.203 1.467 -1.138 2.219 0.095 0.716 1.176 -0.749 2.097 -3.268 2.055l-2.03 -0.034 1.558 -0.57zm-5.928 -16.635c-0.766 -0.847 -0.714 -0.868 2.557 -1.078 1.865 -0.12 3.662 -0.483 4.072 -0.824 1.029 -0.853 1.507 -2.316 0.974 -2.977 -0.808 -1.002 -1.676 -0.627 -1.676 0.724 0 1.767 -1 2.553 -1.989 1.564 -0.591 -0.591 -0.627 -0.822 -0.171 -1.104 0.317 -0.196 0.463 -0.47 0.324 -0.61 -0.14 -0.138 -1.013 0.352 -1.941 1.09 -2.13 1.693 -3.347 1.765 -3.347 0.199 0 -1.727 0.792 -2.865 1.993 -2.865 0.59 0 1.196 0.2 1.347 0.446 0.385 0.622 2.003 -0.291 2.003 -1.13 0 -0.358 -0.362 -0.652 -0.805 -0.652 -0.443 0 -1.194 -0.294 -1.67 -0.654 -0.81 -0.612 -0.76 -0.654 0.806 -0.668 1.396 -0.011 1.67 -0.167 1.67 -0.952 0 -0.622 -0.211 -0.857 -0.625 -0.698 -0.344 0.131 -0.995 -0.041 -1.447 -0.384 -0.453 -0.343 -0.622 -0.63 -0.378 -0.64 0.245 -0.01 1.718 -0.225 3.274 -0.477 2.122 -0.344 2.989 -0.325 3.472 0.075 0.785 0.652 0.06 1.264 -1.514 1.274 -0.57 0.004 -1.002 0.282 -1.002 0.647 0 0.483 0.383 0.578 1.559 0.387 2.191 -0.355 2.191 0.982 0 1.393 -2.25 0.422 -2.034 1.502 0.334 1.673 1.599 0.116 1.915 0.3 2.04 1.183 0.09 0.633 -0.26 1.492 -0.89 2.18l-1.039 1.136 1.074 -0.265c1.244 -0.308 2.711 0.342 2.711 1.203 0 0.434 -1.157 0.663 -4.341 0.857 -2.388 0.146 -4.848 0.388 -5.467 0.538 -0.797 0.193 -1.354 0.02 -1.908 -0.591zm1.386 -3.744c0.785 -0.785 0.653 -1.247 -0.356 -1.247 -0.594 0 -0.891 0.297 -0.891 0.891 0 1.01 0.462 1.141 1.247 0.356zm-4.244 -6.256c3.35 -3.285 6.114 -6.904 6.114 -8.006 0 -0.335 -0.24 -0.85 -0.534 -1.144 -0.416 -0.416 -0.225 -0.534 0.858 -0.534 1.62 0 2.794 0.979 2.526 2.107 -0.137 0.579 0.503 1.18 2.425 2.272 4.394 2.498 7.638 5.274 7.638 6.536 0 0.609 -0.253 1.107 -0.56 1.107 -0.31 0 -2.76 -1.915 -5.446 -4.256l-4.885 -4.256 -3.588 3.753c-2.984 3.122 -6.372 5.65 -7.572 5.65 -0.147 0 1.213 -1.453 3.024 -3.229z"
        fill="#4f4f4f"
      />
      <path
        d="M0.328 48.998c0.128 -0.55 1.637 -10.52 3.353 -22.152 1.715 -11.633 3.21 -21.555 3.32 -22.05 0.167 -0.751 1.35 -1.206 7.12 -2.74l6.918 -1.838 6.919 1.838c5.769 1.534 6.952 1.989 7.12 2.74 0.11 0.495 1.604 10.417 3.32 22.05 1.715 11.633 3.223 21.601 3.352 22.152l0.234 1.002 -20.945 0 -20.945 0 0.234 -1.002zm40.308 -0.445c0.007 -0.719 -6.336 -43.705 -6.475 -43.881 -0.058 -0.074 -3.034 -0.923 -6.614 -1.886l-6.508 -1.752 -6.508 1.752c-3.58 0.963 -6.556 1.812 -6.613 1.886 -0.164 0.21 -6.477 42.785 -6.474 43.658 0.003 0.73 1.234 0.78 19.595 0.78 15.374 0 19.593 -0.12 19.597 -0.557zm-12.278 -3.505c-0.72 -0.765 -1.909 -1.659 -2.644 -1.986 -1.332 -0.595 -1.33 -0.597 0.965 -0.614 1.267 -0.01 2.374 -0.238 2.464 -0.509 0.09 -0.27 0.056 -1.422 -0.075 -2.56 -0.236 -2.038 -0.263 -2.068 -1.797 -2.003 -0.856 0.036 -3.502 0.318 -5.88 0.626 -4.493 0.582 -5.695 0.333 -5.695 -1.182 0 -0.483 0.223 -0.502 1.114 -0.096 0.843 0.383 2.367 0.368 6.241 -0.064 2.82 -0.314 5.221 -0.725 5.337 -0.912 0.47 -0.76 -0.996 -1.356 -2.203 -0.897 -0.658 0.25 -2.135 0.442 -3.283 0.425 -2.398 -0.035 -1.9 -0.371 2.228 -1.508 2.563 -0.705 4.135 -1.767 3.687 -2.492 -0.134 -0.217 -1.276 0.011 -2.538 0.509 -1.261 0.497 -2.716 0.797 -3.234 0.667 -0.604 -0.151 -1.21 0.078 -1.692 0.641 -0.413 0.483 -1.153 0.877 -1.646 0.877 -1.254 0 -1.155 -1.508 0.156 -2.367 2.237 -1.466 3.2 -2.976 1.898 -2.976 -0.337 0 -0.862 -0.3 -1.167 -0.668 -0.472 -0.568 -0.355 -0.668 0.785 -0.668 0.736 0 2.373 -0.334 3.637 -0.742 2.132 -0.689 2.352 -0.69 3.03 -0.01 0.958 0.957 0.739 1.115 -2.12 1.527 -2.294 0.33 -2.417 0.416 -2.72 1.898 -0.175 0.853 -0.23 1.639 -0.124 1.745 0.107 0.107 0.9 -0.142 1.762 -0.553 1.603 -0.765 3.584 -0.96 4.841 -0.478 1.057 0.406 0.871 2.281 -0.288 2.902l-0.993 0.531 0.993 0.443c0.546 0.244 0.993 0.635 0.993 0.87 0 0.256 0.818 0.306 2.031 0.124 2.091 -0.314 3.312 0.18 3.312 1.339 0 0.439 -0.604 0.519 -2.465 0.327l-2.464 -0.255 0.35 1.957c0.514 2.88 0.304 6.69 -0.393 7.132 -0.877 0.556 -0.979 0.514 -2.403 -1zm-16.633 -1.096c-1.03 -1.746 -0.943 -2.458 0.186 -1.522 0.38 0.315 0.794 0.468 0.923 0.34 0.267 -0.268 0.992 -6.573 0.755 -6.573 -0.707 0 -3.698 1.932 -3.645 2.354 0.256 2.016 -0.8 4.286 -1.726 3.713 -0.349 -0.215 -0.31 -0.812 0.135 -2.071 0.6 -1.7 0.58 -1.814 -0.517 -2.91 -1.38 -1.38 -1.22 -1.647 0.66 -1.108 1.95 0.56 5.419 -0.593 5.419 -1.801 0 -1.033 -0.173 -1.048 -1.571 -0.132 -1.198 0.785 -3.083 0.563 -3.455 -0.407 -0.165 -0.43 0.133 -0.535 1.112 -0.391 1.31 0.192 1.331 0.165 1.016 -1.308 -0.177 -0.828 -0.528 -1.76 -0.78 -2.073 -0.626 -0.777 -0.3 -0.96 0.904 -0.504 0.616 0.233 1.111 0.886 1.27 1.675 0.199 0.999 0.45 1.243 1.103 1.073 1.142 -0.3 1.114 -2.361 -0.045 -3.354 -1.082 -0.927 -1.217 -2.328 -0.186 -1.932 0.388 0.149 0.884 0.27 1.103 0.27 0.22 0 0.708 0.473 1.086 1.05 0.617 0.942 0.62 1.343 0.017 3.896 -0.369 1.566 -0.685 4.45 -0.702 6.409 -0.033 3.643 -0.702 6.484 -1.597 6.775 -0.275 0.09 -0.935 -0.571 -1.465 -1.47zm10.204 -3.005c1.034 -0.395 1.608 -0.929 1.705 -1.586 0.169 -1.148 1.285 -1.12 2.023 0.052 0.73 1.16 -0.193 1.782 -2.922 1.968l-2.364 0.161 1.558 -0.595zm-5.814 -16.728l-1.087 -0.905 2.754 -0.015c3.349 -0.018 4.758 -0.51 5.735 -2.001 0.6 -0.916 0.637 -1.264 0.192 -1.801 -0.91 -1.096 -1.78 -0.795 -1.78 0.615 0 1.47 -0.865 2.402 -1.732 1.866 -0.366 -0.226 -0.475 -0.722 -0.289 -1.31 0.408 -1.284 -0.032 -1.19 -1.831 0.39 -1.859 1.631 -3.272 1.77 -3.272 0.321 0 -2.251 2.164 -3.755 3.505 -2.436 0.454 0.446 0.745 0.337 1.47 -0.552l0.906 -1.108 -1.31 -0.268c-2.388 -0.489 -2.733 -1.057 -0.79 -1.3 1.226 -0.154 1.822 -0.465 1.925 -1.003 0.115 -0.605 -0.158 -0.779 -1.22 -0.779 -0.753 0 -1.369 -0.17 -1.369 -0.38 0 -0.44 5.755 -1.474 6.308 -1.133 0.745 0.461 0.34 1.004 -0.965 1.29 -0.743 0.164 -1.336 0.584 -1.336 0.947 0 0.504 0.354 0.586 1.559 0.36 1.218 -0.229 1.558 -0.147 1.558 0.376 0 0.41 -0.6 0.78 -1.558 0.96 -2.247 0.421 -2.034 1.502 0.33 1.673 2.301 0.167 2.683 1.16 1.211 3.15l-0.994 1.344 1.102 -0.276c1.214 -0.305 2.889 0.627 2.438 1.356 -0.154 0.249 -2.138 0.567 -4.41 0.707 -2.271 0.14 -4.542 0.381 -5.046 0.536 -0.592 0.181 -1.3 -0.04 -2.004 -0.624zm1.535 -3.997c0.694 -0.768 0.697 -0.858 0.028 -1.115 -0.968 -0.371 -1.537 0.03 -1.537 1.086 0 1.091 0.538 1.101 1.509 0.029zm-4.115 -6.177c3.102 -3.234 5.723 -6.798 5.723 -7.784 0 -0.335 -0.24 -0.85 -0.534 -1.144 -0.416 -0.416 -0.23 -0.534 0.836 -0.534 1.509 0 2.606 0.968 2.224 1.963 -0.167 0.435 0.707 1.206 2.733 2.41 4.722 2.809 7.654 5.326 7.654 6.574 0 0.591 -0.165 1.075 -0.366 1.075 -0.476 0 -2.687 -1.726 -6.989 -5.455 -1.907 -1.653 -3.626 -3.005 -3.82 -3.005 -0.193 0 -0.654 0.43 -1.023 0.958 -1.95 2.783 -7.713 7.947 -8.87 7.947 -0.248 0 0.846 -1.352 2.432 -3.005z"
        fill="#2f2f2f"
      />
      <path
        d="M0.557 48.9c0 -0.698 6.095 -41.983 6.48 -43.886 0.21 -1.048 0.71 -1.25 7.114 -2.891l6.888 -1.764 6.888 1.764c6.404 1.64 6.903 1.843 7.115 2.89 0.384 1.904 6.48 43.189 6.48 43.887 0 0.567 -2.751 0.655 -20.483 0.655 -17.732 0 -20.482 -0.088 -20.482 -0.655zm40.074 -0.66c0 -0.863 -6.138 -42.617 -6.379 -43.395 -0.069 -0.224 -3.02 -1.178 -6.558 -2.121l-6.432 -1.716 -6.457 1.636c-3.55 0.9 -6.588 1.755 -6.75 1.899 -0.16 0.144 -1.718 9.88 -3.46 21.635 -1.742 11.755 -3.244 21.724 -3.339 22.152 -0.16 0.733 1.002 0.78 19.602 0.78 19.318 0 19.773 -0.02 19.773 -0.87zm-12.232 -3.318c-0.874 -0.873 -2.136 -1.741 -2.805 -1.929 -1.034 -0.29 -0.85 -0.373 1.233 -0.563l2.45 -0.222 -0.153 -2.45c-0.083 -1.346 -0.228 -2.526 -0.32 -2.62 -0.093 -0.095 -1.928 0.072 -4.078 0.37 -8.043 1.12 -8 1.119 -8.57 0.051 -0.5 -0.932 -0.457 -0.957 1.101 -0.664 1.691 0.317 11.357 -0.613 11.345 -1.092 -0.004 -0.15 -0.183 -0.552 -0.398 -0.891 -0.313 -0.495 -0.677 -0.517 -1.84 -0.111 -1.684 0.586 -5.264 0.687 -4.635 0.13 0.233 -0.206 1.57 -0.62 2.97 -0.92 2.896 -0.618 4.862 -1.914 4.094 -2.696 -0.352 -0.36 -1.055 -0.247 -2.596 0.413 -1.162 0.498 -2.556 0.794 -3.098 0.658 -0.659 -0.165 -1.261 0.057 -1.815 0.669 -0.455 0.503 -1.086 0.915 -1.401 0.915 -1.372 0 -1.01 -1.102 0.998 -3.037 1.937 -1.867 2.061 -2.098 1.192 -2.221 -0.533 -0.076 -1.209 -0.427 -1.502 -0.78 -0.448 -0.54 -0.244 -0.64 1.295 -0.64 1.005 0 2.634 -0.324 3.622 -0.719 1.437 -0.575 1.927 -0.609 2.458 -0.168 1.146 0.951 0.741 1.278 -1.96 1.584 -2.59 0.293 -2.624 0.315 -2.88 1.891 -0.142 0.877 -0.169 1.684 -0.06 1.794 0.11 0.109 1.062 -0.13 2.117 -0.534 2.971 -1.134 5.227 -0.883 5.227 0.583 0 0.425 -0.395 1.13 -0.878 1.568 -0.87 0.787 -0.868 0.802 0.249 1.68 0.888 0.699 1.507 0.825 2.93 0.597 1.835 -0.293 3.042 0.213 3.042 1.276 0 0.379 -0.703 0.48 -2.36 0.343l-2.36 -0.195 0.182 4.182c0.149 3.405 0.054 4.29 -0.512 4.76 -0.59 0.49 -0.935 0.337 -2.284 -1.012zm-16.632 -1.192c-1.03 -1.805 -1.03 -1.809 -0.073 -1.296 0.529 0.282 1.062 0.413 1.184 0.29 0.272 -0.271 1.037 -6.23 0.827 -6.44 -0.082 -0.082 -0.97 0.27 -1.974 0.781 -1.532 0.782 -1.824 1.148 -1.824 2.287 0 1.506 -0.69 3.078 -1.351 3.078 -0.637 0 -0.52 -1.649 0.217 -3.076 0.614 -1.187 0.59 -1.278 -0.445 -1.75 -0.6 -0.274 -1.092 -0.792 -1.092 -1.152 0 -0.536 0.245 -0.569 1.359 -0.18 2.042 0.711 5.32 -0.612 5.32 -2.148l0 -1.109 -1.174 0.923c-1.386 1.09 -2.513 1.178 -3.279 0.255 -0.469 -0.565 -0.374 -0.668 0.613 -0.668 1.301 0 1.302 -0.002 0.759 -2.338 -0.22 -0.949 -0.22 -1.67 0 -1.67 0.615 0 1.852 2.139 1.534 2.653 -0.321 0.52 0.225 0.602 1.288 0.194 1 -0.384 0.871 -2.211 -0.266 -3.75 -1.177 -1.59 -0.867 -2.058 0.825 -1.243 1.146 0.553 1.253 0.805 1.2 2.824 -0.108 4.033 -1.085 13.331 -1.51 14.35 -0.583 1.401 -0.952 1.26 -2.138 -0.815zm10.496 -2.854c0.957 -0.416 1.448 -0.938 1.448 -1.54 0 -1.092 0.991 -1.196 1.823 -0.194 0.512 0.616 0.449 0.839 -0.44 1.558 -0.606 0.49 -1.71 0.833 -2.657 0.822l-1.62 -0.017 1.446 -0.629zm-6.17 -16.651l-1.063 -0.861 2.225 0.056c3.649 0.092 5.278 -0.42 6.177 -1.943 0.931 -1.576 0.69 -2.646 -0.598 -2.646 -0.64 0 -0.907 0.294 -0.911 1.002 -0.01 1.402 -0.67 2.292 -1.472 1.985 -0.43 -0.165 -0.59 -0.598 -0.439 -1.178 0.326 -1.247 -0.062 -1.159 -2.093 0.474 -2.622 2.107 -4.35 0.677 -2.276 -1.884 0.745 -0.92 0.97 -0.974 2.025 -0.494 1.477 0.673 1.387 0.68 2.226 -0.16 0.873 -0.872 0.899 -1.526 0.06 -1.526 -0.35 0 -1.202 -0.237 -1.892 -0.527l-1.253 -0.528 1.777 -0.252c1.211 -0.171 1.824 -0.5 1.925 -1.03 0.115 -0.606 -0.158 -0.78 -1.22 -0.78 -0.753 0 -1.369 -0.162 -1.369 -0.36 0 -0.434 5.332 -1.38 6.123 -1.087 1.04 0.386 0.561 1.002 -0.78 1.002 -0.734 0 -1.336 0.084 -1.336 0.186 0 0.103 -0.126 0.515 -0.28 0.917 -0.234 0.611 -0.005 0.708 1.4 0.593 1.051 -0.086 1.754 0.07 1.876 0.419 0.117 0.333 -0.188 0.557 -0.761 0.557 -1.165 0 -2.68 0.763 -2.68 1.351 0 0.236 0.762 0.43 1.692 0.43 2.867 0 3.558 1.47 1.609 3.419l-1.153 1.152 1.174 -0.224c0.755 -0.144 1.525 0.068 2.155 0.593 0.98 0.818 0.979 0.819 -1.054 0.833 -1.857 0.014 -6.279 0.654 -8.034 1.163 -0.395 0.115 -1.196 -0.179 -1.78 -0.652zm1.557 -4.003c0.712 -0.787 0.71 -0.853 -0.03 -1.137 -0.831 -0.32 -2.094 0.893 -1.661 1.593 0.364 0.59 0.867 0.454 1.69 -0.456zm-3.87 -6.403c3.686 -3.8 6.139 -7.418 5.479 -8.078 -0.735 -0.734 -0.51 -1.158 0.612 -1.158 1.238 0 2.264 1.049 1.915 1.958 -0.166 0.431 0.995 1.423 3.623 3.097 4.396 2.799 6.762 4.83 6.762 5.802 0 1.814 -1.189 1.083 -7.698 -4.735 -1.576 -1.408 -3.028 -2.56 -3.226 -2.56 -0.2 0 -1.764 1.522 -3.478 3.382 -2.734 2.967 -5.888 5.523 -6.815 5.523 -0.169 0 1.103 -1.454 2.827 -3.231z"
        fill="#030303"
      />
    </svg>
  );
}

module.exports = piecePositionHoc(GoldGeneralB);